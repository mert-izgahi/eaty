import express from "express";
import { connectDb } from "./utils/connectDb";
import config from "config";
import router from "./router";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import deserializerUser from "./middlewares/deserializerUser.middleware";
const app = express();
app.use(express.json());
app.use(deserializerUser);
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

    router(app);
    
    app.use(errorHandlerMiddleware);
  } catch (error) {
    console.log(error);
  }
}

startServer();
