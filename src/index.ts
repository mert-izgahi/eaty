import express from "express";
import { connectDb } from "./utils/connectDb";
import config from "config";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function startServer() {
  try {
    const port: number = config.get<number>("port");
    const mongoUrl: string = config.get<string>("mongoUrl");
    await connectDb(mongoUrl);
    app.listen(port, () => {
      console.log(
        "Example app listening on port" + ` http://localhost:${port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
