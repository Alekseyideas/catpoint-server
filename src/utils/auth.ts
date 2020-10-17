import { Response } from "express";
import { User } from "../entities/User";
import { sign } from "jsonwebtoken";

export const createAccessToken = (data: User) => {
  return sign({ data: data.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (data: User) => {
  return sign({ id: data.id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("cpt", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
