import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entities";
import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken,
} from "../utils/auth";

export const refreshToken = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const token = req.cookies?.cpt;
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }
  console.log(payload, "payload");
  // token is valid and
  // we can send back an access token
  const user = await User.findOne({ id: payload.id });

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
};
