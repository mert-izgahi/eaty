import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import deserializerUser from "../middlewares/deserializerUser.middleware";
import router from "../router";
import errorHandlerMiddleware from "../middlewares/errorHandler.middleware";
export default function createServer() {
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
  router(app);
  app.use(errorHandlerMiddleware);
  return app;
}
