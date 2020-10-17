import { Request, Response, NextFunction } from "express";
import {
  sendRefreshToken,
  createRefreshToken,
  createAccessToken,
} from "../utils/auth";
import { User } from "../entities";
import { BadRequest } from "../utils/CpError";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.cookies);
    if (!req.body?.appId) {
      throw new BadRequest("appId is required");
    }
    if (!req.body?.email) {
      throw new BadRequest("email is required");
    }
    if (!req.body?.firstName) {
      throw new BadRequest("firstName is required");
    }

    const { appId, email, firstName, lastName, image } = req.body;
    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
      sendRefreshToken(res, createRefreshToken(existUser));
      return res.send({
        ok: true,
        data: { ...existUser, token: createAccessToken(existUser) },
      });
    }
    const user = await User.create({
      appId,
      email,
      firstName,
      lastName,
      image,
    }).save();
    sendRefreshToken(res, createRefreshToken(user));
    return res.send({
      ok: true,
      data: { ...user, token: createAccessToken(user) },
    });
  } catch (e) {
    return next(e);
  }
};
