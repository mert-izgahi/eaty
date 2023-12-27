import config from "../configs";
import { connectDb } from "./utils/connectDb";
import createServer from "./utils/createServer";

const app = createServer();
const port: number = config.port || 3000;
const mongoUrl: string = config.mongoUrl || "";

console.log("mongoUrl", mongoUrl);

async function startServer() {
  try {
    app.listen(port, async () => {
      console.log(
        "Example app listening on port" + ` http://localhost:${port}`
      );
      await connectDb(mongoUrl);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
