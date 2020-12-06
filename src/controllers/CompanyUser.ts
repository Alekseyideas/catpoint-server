import { Request, Response, NextFunction } from 'express';
import { Company, CompanyUser, User } from '../entities';

export const wsAddPoint = async (companyId: number, userId: number, points: number = 1) => {
  try {
    const company = await Company.findOneOrFail({ id: companyId });
    await User.findOneOrFail({ id: userId });
    const existCompaniesUsers = await CompanyUser.findOne({ where: { companyId, userId } });

    const companyObj = {
      __company__: {
        name: company.name || '',
        totalPoints: company.totalPoints || 0,
      },
    };

    if (existCompaniesUsers) {
      const { id, points: exPoints, visits } = existCompaniesUsers;

      const resetOrUpdatePoints = company.totalPoints > exPoints + 1 ? exPoints + 1 : 0;

      const updatedObj = {
        points: resetOrUpdatePoints,
        visits: visits + 1,
      };
      await CompanyUser.update(
        {
          id,
        },
        updatedObj
      );
      const isComplite = exPoints + 1 === company.totalPoints;
      return {
        isComplite,
        ...existCompaniesUsers,
        ...updatedObj,
        ...companyObj,
      };
    }

    const companiesUsers = await CompanyUser.create({
      companyId,
      userId,
      points,
      visits: 1,
    }).save();

    return {
      isComplite: false,
      ...companiesUsers,
      ...companyObj,
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserCompanies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.body;
    const objToFindArr: { id: number }[] = [];

    for (let i in ids) {
      objToFindArr.push({ id: ids[i] });
    }

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
      .addSelect(['company.name', 'company.totalPoints'])
      .where({ userId })
      .innerJoin('CompanyUser.company', 'company')
      .getMany();

    return companies;
  } catch (e) {
    throw new Error(e);
  }
};
