import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entities";
import { createRefreshToken, createAccessToken } from "../utils/auth";

export const refreshToken = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const token = req.body?.refreshToken;
  if (!token) {
    return res.send({ ok: false, data: { token: "", refreshToken: "" } });
  }

  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, data: { token: "", refreshToken: "" } });
  }
  // token is valid and
  // we can send back an access token
  const user = await User.findOne({ id: payload.id });

  if (!user) {
    return res.send({ ok: false, data: { token: "", refreshToken: "" } });
  }

  // sendRefreshToken(res, createRefreshToken(user));

  return res.send({
    ok: true,
    data: {
      token: createAccessToken(user),
      refreshToken: createRefreshToken(user),
    },
  });
};
