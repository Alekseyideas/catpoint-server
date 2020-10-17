import { Request } from "express";
import { verify } from "jsonwebtoken";

export const getTokenData = (req: Request) => {
  const authorization = req.headers["authorization"];
  if (!authorization) throw new Error("not authenticated");

  try {
    const token = authorization.split(" ")[1];
    return verify(token, process.env.ACCESS_TOKEN_SECRET!);
  } catch (e) {
    throw new Error(e.message);
  }
};
