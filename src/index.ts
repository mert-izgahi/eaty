import express from "express";
import { connectDb } from "./utils/connectDb";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function startServer() {
  try {
    await connectDb();
    app.listen(3000, () => {
      console.log("Example app listening on port http://localhost:3000!");
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();