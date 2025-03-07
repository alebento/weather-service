const request = require("supertest");
const app = require("../../server");
const User = require("../models/User");
const { connectTestDB, closeTestDB, clearTestDB } = require("./setupTestDB");

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

describe("Auth API", () => {
  test("Deve registrar um novo usuário", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Teste", email: "teste@email.com", password: "123456" });
console.log(res)
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message");
  }, 30000);

  test("Deve fazer login com usuário válido", async () => {
    await User.create({ name: "Teste", email: "teste@email.com", password: "123456" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "teste@email.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
