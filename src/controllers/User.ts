import { Request, Response, NextFunction } from "express";
import { BadRequest } from "../utils/CpError";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("req.body", req.body);
  try {
    if (!req.body?.appId) {
      throw new BadRequest("appId is required");
    }
    if (!req.body?.email) {
      throw new BadRequest("email is required");
    }
    if (!req.body?.firstName) {
      throw new BadRequest("firstName is required");
    }
    res.send({
      status: "ok",
    });
  } catch (e) {
    next(e);
  }
};
