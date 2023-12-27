import { Express } from "express";
import {
  createProductController,
  deleteOneProductController,
  getOneProductController,
  getProductsController,
  updateOneProductController,
} from "./controllers/products.controller";
import asyncWrapper from "./middlewares/asyncWrapper.middleware";
import {
  LoginUserController,
  registerUserController,
  getUsersController,
  getOneUserController,
  updateOneUserController,
} from "./controllers/users.controller";
import withAuth from "./middlewares/withAuth.middleware";
import {
  createOrderController,
  deleteOneOrderController,
  getOneOrderController,
  getOrdersController,
  updateOneOrderController,
} from "./controllers/orders.controller";

export default function router(app: Express) {
  app.get("/api/v1/test-api", (req, res) => {
    res.send("👍 Api is working");
  });

  // user routes
  app.post("/api/v1/auth/register", asyncWrapper(registerUserController));
  app.post("/api/v1/auth/login", asyncWrapper(LoginUserController));
  app.get("/api/v1/users", withAuth, asyncWrapper(getUsersController));
  app.get("/api/v1/users/:id", withAuth, asyncWrapper(getOneUserController));
  app.put("/api/v1/users/:id", withAuth, asyncWrapper(updateOneUserController));
  // products routes
  app.get("/api/v1/products", withAuth, asyncWrapper(getProductsController));
  app.get("/api/v1/products/:id", asyncWrapper(getOneProductController));
  app.post("/api/v1/products", withAuth, asyncWrapper(createProductController));
  app.delete(
    "/api/v1/products/:id",
    withAuth,
    asyncWrapper(deleteOneProductController)
  );
  app.put(
    "/api/v1/products/:id",
    withAuth,
    asyncWrapper(updateOneProductController)
  );

  // orders
  app.get("/api/v1/orders", withAuth, asyncWrapper(getOrdersController));
  app.get("/api/v1/orders/:id", withAuth, asyncWrapper(getOneOrderController));
  app.post("/api/v1/orders", withAuth, asyncWrapper(createOrderController));
  app.put("api/v1/orders", asyncWrapper(updateOneOrderController));
  app.delete("api/v1/orders/:id", asyncWrapper(deleteOneOrderController));
}
