import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";

import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { PORT } from "./utils/const";
import { connectToDb } from "./utils/connection";
import routes from "./routes";
import { CpError } from "./utils/CpError";
import isAuth from "./middleware/isUserAuth";

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
    app.use(helmet());
    await connectToDb();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json({ type: "application/json" }));
    app.use(morgan("combined"));
    app.use(cookieParser());
    await app.use("/api/v1", isAuth, routes);

    interface IError extends Error {
      statusCode: number;
      data: Object;
    }

    app.use(
      (error: IError, _req: Request, res: Response, _next: NextFunction) => {
        const errorObj = {
          ok: false,
          message: error.message,
        };
        if (error instanceof CpError) {
          return res.status(error.getCode()).json(errorObj);
        }
        console.log(errorObj);
        return res.status(500).send(errorObj);
      }
    );

    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://127.0.0.1:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
