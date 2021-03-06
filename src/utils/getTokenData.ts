import { Request } from 'express';
import { verify } from 'jsonwebtoken';

export type TTokenData = {
  id: number;
  isCompany: boolean;
  iat: number;
  exp: number;
};

export const verifyToken = (authorization: string) => {
  try {
    if (!authorization) throw new Error('not authenticated');
    const token = authorization.split(' ')[1];
    return verify(token, process.env.ACCESS_TOKEN_SECRET!);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const getTokenData = (req: Request) => {
  const authorization = req.headers['authorization'];
  if (!authorization) throw new Error('not authenticated');

  return verifyToken(authorization);
};
