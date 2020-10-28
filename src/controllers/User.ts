import { Request, Response, NextFunction } from 'express';
import { createRefreshToken, createAccessToken } from '../utils/auth';
import { User } from '../entities';
import { BadRequest } from '../utils/CpError';
import { getTokenData } from '../utils/getTokenData';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body?.appId) {
      throw new BadRequest('appId is required');
    }
    if (!req.body?.email) {
      throw new BadRequest('email is required');
    }
    if (!req.body?.firstName) {
      throw new BadRequest('firstName is required');
    }

    const { appId, email, firstName, lastName, image } = req.body;
    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
      return res.send({
        ok: true,
        data: {
          ...existUser,
          token: createAccessToken(existUser),
          refreshToken: createRefreshToken(existUser),
        },
      });
    }
    const user = await User.create({
      appId,
      email,
      firstName,
      lastName,
      image,
    }).save();
    return res.send({
      ok: true,
      data: {
        ...user,
        token: createAccessToken(user),
        refreshToken: createRefreshToken(user),
      },
    });
  } catch (e) {
    return next(e);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = getTokenData(req) as { id: number };
    const user = await User.findOne({ id: payload.id });
    if (!user) throw new Error('User does not exist');
    return res.send({
      ok: true,
      data: user,
    });
  } catch (e) {
    return next(e);
  }
};
