import { Request, Response, NextFunction } from 'express';
import { createRefreshToken, createAccessToken } from '../utils/auth';
import { User } from '../entities';
import { BadRequest } from '../utils/CpError';
import { getTokenData } from '../utils/getTokenData';

const checkFbAccToUpdate = (
  existUser: User,
  data: { appId: string; email: string; firstName: string; lastName: string; image: string }
): boolean => {
  if (existUser.email !== data.email) return true;
  if (existUser.lastName !== data.lastName) return true;
  if (existUser.firstName !== data.firstName) return true;
  if (existUser.image !== data.image) return true;
  if (existUser.appId !== data.appId) return true;
  return false;
};

const getUserFromDb = (data: { email?: string; id?: number }) => {
  const dataWhere = data.email ? { email: data.email } : { id: data.id };
  return User.createQueryBuilder()
    .where(dataWhere)
    .leftJoinAndSelect('User.companies', 'companies')
    .getOne();
};

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

    const { appId, email, firstName, lastName, image } = req.body as User;
    const existUser = await getUserFromDb({ email });

    const updateFbAccount = async () => {
      if (existUser && checkFbAccToUpdate(existUser, req.body)) {
        existUser.email = email;
        existUser.firstName = firstName;
        existUser.lastName = lastName;
        existUser.image = image;
        existUser.appId = appId;
        await User.save(existUser);
      }
    };

    if (existUser) {
      await updateFbAccount();
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
    const user = await getUserFromDb({ id: payload.id });
    if (!user) throw new Error('User does not exist');
    return res.send({
      ok: true,
      data: user,
    });
  } catch (e) {
    return next(e);
  }
};
