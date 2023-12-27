import config from "config";
import { connectDb } from "./utils/connectDb";
import createServer from "./utils/createServer";

const app = createServer();
const port: number = config.get<number>("port");
const mongoUrl: string = config.get<string>("mongoUrl");
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
