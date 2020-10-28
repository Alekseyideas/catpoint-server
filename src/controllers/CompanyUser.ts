import { Request, Response, NextFunction } from 'express';
import { CompanyUser } from '../entities';
import { getTokenData, TTokenData } from '../utils/getTokenData';

export const addPoint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = getTokenData(req) as TTokenData;

    const compUserExist = await CompanyUser.findOne({
      where: { companyId: payload.id, userId: req.body.userId },
    });
    if (compUserExist) {
      return res.send({
        ok: true,
        data: {
          exist: true,
        },
      });
    }

    const compUser = await CompanyUser.create({
      companyId: payload.id,
      userId: req.body.userId,
      points: req.body.points,
    }).save();

    console.log('addPoint -> compUser', compUser);
    console.log('addPoint -> payload', payload);
    console.log('addPoint -> req', req.body);

    return res.send({
      ok: true,
      data: compUser,
    });
  } catch (e) {
    return next(e);
  }
};
