import { Request, Response, NextFunction } from 'express';
import { Company, CompanyUser } from '../entities';
import { getTokenData, TTokenData } from '../utils/getTokenData';

export const addPoint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = getTokenData(req) as TTokenData;
    const compUserExist = await CompanyUser.findOne({
      where: { companyId: req.body.companyId, userId: req.body.userId },
      // where: { companyId: payload.id, userId: req.body.userId }, return after dev
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
      companyId: req.body.companyId,
      // companyId: payload.id, return after dev
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

export const getUserCompanies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.body;
    const objToFindArr: { id: number }[] = [];

    for (let i in ids) {
      objToFindArr.push({ id: ids[i] });
    }

    // const companies = await Company.find({ where: objToFindArr, select: ['name', 'id', 'image'] });
    const companies = await Company.createQueryBuilder()
      .where(objToFindArr)
      .select(['Company.name', 'Company.id', 'Company.image'])
      .leftJoinAndSelect('Company.users', 'users')
      .getMany();

    return res.send({
      ok: true,
      data: companies,
    });
  } catch (e) {
    return next(e);
  }
};
export const wsGetUserCompanies = async (userId: number[]) => {
  try {
    const companies = await CompanyUser.createQueryBuilder()
      .select(['CompanyUser.points', 'company.name'])
      .where({ userId: 7 })
      .innerJoin('CompanyUser.company', 'company')
      .getMany();

    return companies;
  } catch (e) {
    throw new Error(e);
  }
};
