const request = require("supertest");
const app = require("../../server");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { connectTestDB, closeTestDB, clearTestDB } = require("./setupTestDB");
const { beforeEach } = require("@jest/globals");

let token;

beforeAll(async () => {
  await connectTestDB();
});

beforeEach(async () => {
  const user = await User.create({ name: "Teste", email: "teste@email.com", password: "123456" });
  token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
})

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

describe("Weather API", () => {
  test("Deve obter previsão do tempo", async () => {
    const res = await request(app)
      .get("/api/weather?city=Belo Horizonte")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("temperature");
    expect(res.body).toHaveProperty("description");
  });

  test("Deve obter histórico de buscas", async () => {
    const res = await request(app)
      .get("/api/history")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
