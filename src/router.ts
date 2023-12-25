import { Express } from "express";
import { createMenuItem, getAllMenuItems } from "./controllers/menuItem.controller";

export default function router(app: Express) {
  app.get("/api/v1/test-api", (req, res) => {
    res.send("👍 Api is working");
  });
  app.get("/api/v1/menu-items", getAllMenuItems);
  app.post("/api/v1/menu-items", createMenuItem);
}
