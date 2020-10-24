import { User } from '../entities/User';
import { sign } from 'jsonwebtoken';
import { Company } from '../entities/Company';

export const createAccessToken = (data: User | Company) => {
  return sign({ data: data.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '1d',
  });
};

export const createRefreshToken = (data: User | Company) => {
  return sign({ id: data.id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '14d',
  });
};

// export const sendRefreshToken = (res: Response, token: string) => {
//   res.cookie("cpt", token, {
//     httpOnly: true,
//     path: "/refresh_token",
//   });
// };
