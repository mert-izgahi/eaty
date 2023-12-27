import supertest from "supertest";
import createServer from "../utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Product from "../models/product.model";
import config from "config";

const app = createServer();
beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});
const token = config.get<string>("token");

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
  describe("POST /product", () => {
    describe("when user is not authenticated", () => {
      it("should return product with status code 401", async () => {
        const response = await supertest(app)
          .post("/api/v1/products")
          .set("Authorization", `Bearer ${"invalid-token"}`)
          .send(productPayload);

        createdProduct = await response.body.data; // Store data after awaiting response
        console.log(response.body);
        expect(response.status).toBe(401);
        expect(response.body.state).toEqual("error");
        expect(createdProduct).toBeUndefined(); // Add an assertion for the created product
      });
    });

    describe("when user is authenticated", () => {
      it("should return product with status code 201", async () => {
        const response = await supertest(app)
          .post("/api/v1/products")
          .set("Authorization", `Bearer ${token}`)
          .send(productPayload);
        createdProduct = await response.body.data; // Store data after awaiting response
        expect(response.status).toBe(201);
        expect(response.body.message).toEqual("Product created successfully");
        expect(createdProduct).toBeDefined(); // Add an assertion for the created product
      });
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
      const response = await supertest(app).get(
        `/api/v1/products/${createdProduct._id}`
      );
      expect(response.status).toBe(200);
    });
  });

  describe("PUT /products/:id", () => {
    it("should return product with status code 200", async () => {
      const response = await supertest(app)
        .put(`/api/v1/products/${createdProduct._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(productPayload);
      expect(response.status).toBe(200);
    });
  });

  describe("DELETE /products/:id", () => {
    it("should return product with status code 200", async () => {
      const response = await supertest(app)
        .delete(`/api/v1/products/${createdProduct._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });
});
