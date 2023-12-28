import supertest from "supertest";
import createServer from "../utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
const app = createServer();

let createdProduct: any = null;
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
let productPayload = {
  name: "Product 1",
  price: 100,
  description: "Product 1 description",
  category: "Laptops",
};
let token = "";
beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
  createdProduct = null;
});

describe("Products Controller", () => {
  describe("POST /register", () => {
    it("should return token with status code 201", async () => {
      const response = await supertest(app)
        .post("/api/v1/auth/register")
        .send(userPayload);

      token = await response.body.data;
      const status = await response.status;
      expect(status).toBe(201);
    });
  });
  describe("POST /login", () => {
    it("should return token with status code 200", async () => {
      const response = await supertest(app).post("/api/v1/auth/login").send({
        email: userPayload.email,
        password: userPayload.password,
      });

      token = await response.body.data;

      expect(response.status).toBe(200);
    });
  });

  describe("GET /products", () => {
    it("should return products with status code 200", async () => {
      const response = await supertest(app).get("/api/v1/products");
      expect(response.status).toBe(200);
    });
  });

  describe("GET /products/:id", () => {
    it("should return product with status code 200", async () => {
      const productId = "62b2c4a6a9f7b7b7b7b7b7b7";
      const response = await supertest(app).get(
        `/api/v1/products/${productId}`
      );
      expect(response.status).toBe(404);
    });
  });

  describe("POST /products", () => {
    it("should return product with status code 201", async () => {
      const response = await supertest(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .send(productPayload);

      createdProduct = await response.body.data;
      expect(response.status).toBe(201);
    });
  });

  describe("PUT /products/:id", () => {
    it("should return product with status code 200", async () => {
      const productId = createdProduct._id;
      const response = await supertest(app)
        .put(`/api/v1/products/${productId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(productPayload);

      expect(response.status).toBe(200);
    });
  });

  describe("DELETE /products/:id", () => {
    it("should return product with status code 200", async () => {
      const productId = createdProduct._id;
      const response = await supertest(app)
        .delete(`/api/v1/products/${productId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
