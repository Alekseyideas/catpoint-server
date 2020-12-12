import { Request, Response, NextFunction } from 'express';
import { Company, CompanyUser, User, UserVisitHistory } from '../entities';

export const wsAddPoint = async (companyId: number, userId: number, points: number = 1) => {
  try {
    const company = await Company.findOneOrFail({ id: companyId });
    await User.findOneOrFail({ id: userId });
    const existCompaniesUsers = await CompanyUser.findOne({ where: { companyId, userId } });

    await UserVisitHistory.create({
      companyId,
      userId,
      points,
    }).save();

    const companyObj = {
      __company__: {
        name: company.name || '',
        totalPoints: company.totalPoints || 0,
      },
    };

    if (existCompaniesUsers) {
      const { id, points: exPoints, visits, finishedCount } = existCompaniesUsers;
      const isComplite = exPoints + 1 === company.totalPoints;
      const resetOrUpdatePoints = isComplite ? 0 : exPoints + 1;
      const updatedFinishedCount = isComplite ? finishedCount + 1 : finishedCount;
      const updatedObj = {
        points: resetOrUpdatePoints,
        visits: visits + 1,
        finishedCount: updatedFinishedCount,
      };
      await CompanyUser.update(
        {
          id,
        },
        updatedObj
      );

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

export const wsGetUserCompanies = async (userId: number) => {
  try {
    const companies = await CompanyUser.createQueryBuilder()
      .addSelect(['company.name', 'company.totalPoints'])
      .where({ userId })
      .innerJoin('CompanyUser.company', 'company')
      .orderBy('company.updateAt', 'ASC')
      .getMany();

    return companies;
  } catch (e) {
    throw new Error(e);
  }
};
