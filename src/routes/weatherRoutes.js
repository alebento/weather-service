const express = require("express");
const { getWeather, getHistory } = require("../controllers/weatherController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/weather", authMiddleware, getWeather);
router.get("/history", authMiddleware, getHistory);

module.exports = router;
