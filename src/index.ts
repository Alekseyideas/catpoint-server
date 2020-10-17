import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";
import { PORT } from "./utils/const";
import { connectToDb } from "./utils/connection";
import routes from "./routes";
import { CpError } from "./utils/CpError";

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

    await app.use("/api", routes);

    interface IError extends Error {
      statusCode: number;
      data: Object;
    }

    app.use(
      (error: IError, _req: Request, res: Response, _next: NextFunction) => {
        const errorObj = {
          status: "error",
          message: error.message,
        };
        if (error instanceof CpError) {
          return res.status(error.getCode()).json(errorObj);
        }
        return res.status(500).json(errorObj);
      }
    );

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://127.0.0.1:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
