import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";
import { PORT } from "./utils/const";
import { connectToDb } from "./utils/connection";
import routes from "./routes";

(async () => {
  console.log("⏫ " + process.env.npm_package_version);
  const app: Application = express();
  try {
    app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    );
    await connectToDb();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({ type: "application/json" }));
    app.use(morgan("combined"));

    app.use("/api", routes);

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://127.0.0.1:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
