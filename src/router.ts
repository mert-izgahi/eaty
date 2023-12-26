import { Express } from "express";
import {
  createMenuItemController,
  deleteOneItemController,
  getMenuItemsController,
  getOneItemController,
  updateOneItemController,
} from "./controllers/menuItem.controller";
import asyncWrapper from "./middlewares/asyncWrapper.middleware";
import {
  LoginUserController,
  registerUserController,
  getUsersController,
  getOneUserController
} from "./controllers/users.controller";
import withAuth from "./middlewares/withAuth.middleware";
export default function router(app: Express) {
  app.get("/api/v1/test-api", (req, res) => {
    res.send("👍 Api is working");
  });

  // user routes
  app.post("/api/v1/auth/register", asyncWrapper(registerUserController));
  app.post("/api/v1/auth/login", asyncWrapper(LoginUserController));
  app.get('/api/v1/users', withAuth, asyncWrapper(getUsersController));
  app.get('/api/v1/users/:id', withAuth, asyncWrapper(getOneUserController));
  // menu items routes
  app.get("/api/v1/menu-items", withAuth, asyncWrapper(getMenuItemsController));
  app.get("/api/v1/menu-items/:id", asyncWrapper(getOneItemController));
  app.post(
    "/api/v1/menu-items",
    withAuth,
    asyncWrapper(createMenuItemController)
  );
  app.delete(
    "/api/v1/menu-items/:id",
    withAuth,
    asyncWrapper(deleteOneItemController)
  );
  app.put(
    "/api/v1/menu-items/:id",
    withAuth,
    asyncWrapper(updateOneItemController)
  );
}
