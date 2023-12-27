import express from "express";
import { connectDb } from "./utils/connectDb";
import config from "config";
import router from "./router";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import deserializerUser from "./middlewares/deserializerUser.middleware";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(deserializerUser);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    abortOnLimit: true,
    uploadTimeout: 60 * 1000,
    responseOnLimit: "File is too large",
  })
);
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

    app.get("/checkout", (req, res) => {
      console.log(req.body);

      res.json({
        success: true,
        message: "success",
      });
    });
    router(app);

    app.use(errorHandlerMiddleware);
  } catch (error) {
    console.log(error);
  }
}

startServer();
