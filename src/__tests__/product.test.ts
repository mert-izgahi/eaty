import supertest from "supertest";
import createServer from "../utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
const app = createServer();

beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

let createdProduct: any = null;
let productPayload = {
  name: "Product 1",
  price: 100,
  description: "Product 1 description",
  category: "Laptops",
};
afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
  createdProduct = null;
});

describe("Products Controller", () => {
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
});
