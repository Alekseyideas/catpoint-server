import { NextFunction, Request, Response } from "express";
import { getTokenData } from "../utils/getTokenData";

const api = "/api/v1";
const userApi = api + "/user";
const companyApi = api + "/company";
const excludeUrls = [
  `${userApi}/sign-up`,
  `${userApi}/sign-in`,
  `${companyApi}/sign-up`,
  `${companyApi}/sign-in`,
  `${api}/refresh-token`,
];

export default function (req: Request, _res: Response, next: NextFunction) {
  if (excludeUrls.includes(req.originalUrl)) return next();

  try {
    getTokenData(req);
    next();
  } catch (e) {
    throw new Error(e.message);
  }
}
