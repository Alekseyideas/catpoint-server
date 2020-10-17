import { NextFunction, Request, Response } from "express";

export default function (_req: Request, _res: Response, next: NextFunction) {
  //   throw new Error("Not auth");
  next();
}
