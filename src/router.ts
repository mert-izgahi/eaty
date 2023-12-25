import { Express } from "express";

export default function router(app: Express) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}
