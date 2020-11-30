import { Request, Response, NextFunction } from 'express';
import argon2 from 'argon2';
import { createRefreshToken, createAccessToken } from '../utils/auth';
import { Company } from '../entities';
import { BadRequest } from '../utils/CpError';
import { getTokenData } from '../utils/getTokenData';
// import { getTokenData } from '../utils/getTokenData';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body?.email) {
      throw new BadRequest('email is required');
    }
    if (!req.body?.firstName) {
      throw new BadRequest('firstName is required');
    }
    if (!req.body?.position) {
      throw new BadRequest('position is required');
    }
    if (!req.body?.address) {
      throw new BadRequest('position is required');
    }
    if (!req.body?.name) {
      throw new BadRequest('name is required');
    }
    if (!req.body?.phone) {
      throw new BadRequest('name is required');
    }
    if (!req.body?.password) {
      throw new BadRequest('password is required');
    }

    const {
      email,
      name,
      phone,
      password,
      position,
      address,
      firstName,
    }: {
      email: string;
      name: string;
      phone: string;
      password: string;
      position: string;
      address: string;
      firstName: string;
    } = req.body;
    const existCompany = await Company.findOne({ where: { email } });
    if (existCompany) throw new BadRequest('Company already exist');
    const hash = await argon2.hash(password);

    const company = await Company.create({
      email,
      name,
      phone,
      password: hash,
      position,
      address,
      firstName,
    }).save();

    return res.send({
      ok: true,
      data: {
        ...company,
        token: createAccessToken(company, true),
        refreshToken: createRefreshToken(company, true),
      },
    });
  } catch (e) {
    return next(e);
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body?.email) {
      throw new BadRequest('email is required');
    }
    if (!req.body?.password) {
      throw new BadRequest('password is required');
    }
    const { email, password } = req.body;
    const company = await Company.createQueryBuilder()
      .where({ email })
      // .leftJoinAndSelect('Company.companies', 'companies')
      .addSelect('Company.password')
      .getOne();
    console.log(company);
    // const company = await Company.findOne({ where: { email } });
    if (!company) throw new BadRequest('Company does not exist');
    const isPassCorrect = await argon2.verify(company.password, password);

    if (!isPassCorrect) throw new BadRequest('password is incorrect');
    return res.send({
      ok: true,
      data: {
        ...company,
        password: null,
        token: createAccessToken(company, true),
        refreshToken: createRefreshToken(company, true),
      },
    });
  } catch (e) {
    return next(e);
  }
};

export const getCompanies = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const companies = await Company.find({ select: ['id', 'name', 'image'] });
    console.log('getCompanies -> company', companies);
    if (!companies) throw new Error('companies does not exist');
    return res.send({
      ok: true,
      data: companies,
    });
  } catch (e) {
    return next(e);
  }
};

export const getCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = getTokenData(req) as { id: number };
    const company = await Company.createQueryBuilder()
      .leftJoinAndSelect('Company.users', 'users')
      .where({ id: payload.id })
      .getOne();
    // const company = await Company.findOne({ id: payload.id });

    if (!company) throw new Error('company does not exist');
    return res.send({
      ok: true,
      data: company,
    });
  } catch (e) {
    return next(e);
  }
};
