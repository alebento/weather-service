const axios = require("axios");
const redis = require("../config/cache"); // Importando conexão Redis
const SearchHistory = require("../models/SearchHistory");

const getWeather = async (req, res) => {
  const { city, lat, lon } = req.query;
  const userId = req.user.userId;

  if (!city && (!lat || !lon)) {
    return res.status(400).json({ error: "Use sua localização ou digite a cidade" });
  }

  try {
    const cacheKey = city ? `weather:${city.toLowerCase()}` : `weather:${lat},${lon}`;
    
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      console.info("Dados carregados do cache");
      return res.json(JSON.parse(cachedData));
    }

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        lat,
        lon,
        appid: process.env.WEATHER_API_KEY,
        lang: "pt",
        units: "metric",
      },
    });

    const weatherData = {
      city: city ?? response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind_speed: response.data.wind.speed,
    };

    await redis.setex(cacheKey, 600, JSON.stringify(weatherData));

    await SearchHistory.create({ userId, city: weatherData.city, weather: weatherData });

    res.json(weatherData);
  } catch (error) {
    console.error("Erro ao obter dados meteorológicos:", error.response?.data || error.message);
    res.status(400).json({ error: "Erro ao obter dados meteorológicos", details: error.response?.data || error.message });
  }
};

const getHistory = async (req, res) => {
  const userId = req.user.userId;
  const history = await SearchHistory.find({ userId }).sort({ createdAt: -1 });
  res.json(history);
};

module.exports = { getWeather, getHistory };
