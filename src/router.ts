import { Express } from "express";
import {
  createMenuItemController,
  deleteOneItemController,
  getMenuItemsController,
  getOneItemController,
  updateOneItemController,
} from "./controllers/menuItem.controller";
import asyncWrapper from "./middlewares/asyncWrapper.middleware";
import { LoginUserController, registerUserController } from "./controllers/users.controller";
export default function router(app: Express) {
  app.get("/api/v1/test-api", (req, res) => {
    res.send("👍 Api is working");
  });

  // user routes
  app.post("/api/v1/auth/register", asyncWrapper(registerUserController));
  app.post("/api/v1/auth/login", asyncWrapper(LoginUserController));

  // menu items routes
  app.get("/api/v1/menu-items", asyncWrapper(getMenuItemsController));
  app.post("/api/v1/menu-items", asyncWrapper(createMenuItemController));
  app.get("/api/v1/menu-items/:id", asyncWrapper(getOneItemController));
  app.delete("/api/v1/menu-items/:id", asyncWrapper(deleteOneItemController));
  app.put("/api/v1/menu-items/:id", asyncWrapper(updateOneItemController));
}
