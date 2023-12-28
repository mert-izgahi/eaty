import supertest from "supertest";
import createServer from "../utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const app = createServer();

let createdUser: any = null;
let userPayload = {
  email: "mert@mail.com",
  password: "Aa123456",
  name: "Mert",
  phone: "123456789",
  role: "user",
  address: "address",
  paymentMethod: "card",
};

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
  createdUser = null;
});

describe("Users Controller", () => {
  describe("POST /register", () => {
    it("should return token with status code 201", async () => {
      const response = await supertest(app)
        .post("/api/v1/auth/register")
        .send(userPayload);
      expect(response.status).toBe(201);
    });
  });

  describe("POST /login", () => {
    it("should return token with status code 200", async () => {
      const response = await supertest(app).post("/api/v1/auth/login").send({
        email: userPayload.email,
        password: userPayload.password,
      });
      expect(response.status).toBe(200);
    });

    it("should return error with status code 401", async () => {
      const response = await supertest(app).post("/api/v1/auth/login").send({
        email: userPayload.email,
        password: "wrong-password",
      });
      expect(response.status).toBe(401);
    });

    it("should return error with status code 401", async () => {
      const response = await supertest(app).post("/api/v1/auth/login").send({
        email: "wrong-email",
        password: userPayload.password,
      });
      expect(response.status).toBe(401);
    });
  });
});
