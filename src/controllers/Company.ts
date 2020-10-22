import { Request, Response, NextFunction } from "express";
import { createRefreshToken, createAccessToken } from "../utils/auth";
import { Company } from "../entities/Company";
import { BadRequest } from "../utils/CpError";
import { getTokenData } from "../utils/getTokenData";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    const { email, name, phone, passwword } = req.body;
    const existCompany = await Company.findOne({ where: { email } });
    console.log("existCompany", existCompany);
    return res.send({ ok: true });
    // if (existUser) {
    //   return res.send({
    //     ok: true,
    //     data: {
    //       ...existUser,
    //       token: createAccessToken(existUser),
    //       refreshToken: createRefreshToken(existUser),
    //     },
    //   });
    // }
    // const user = await User.create({
    //   appId,
    //   email,
    //   firstName,
    //   lastName,
    //   image,
    // }).save();
    // return res.send({
    //   ok: true,
    //   data: {
    //     ...user,
    //     token: createAccessToken(user),
    //     refreshToken: createRefreshToken(user),
    //   },
    // });
  } catch (e) {
    return next(e);
  }
};

export const getCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = getTokenData(req) as { data: number };
    const company = await Company.findOne({ id: payload.data });
    if (!company) throw new Error("User does not exist");
    return res.send({
      ok: true,
      data: company,
    });
  } catch (e) {
    return next(e);
  }
};
