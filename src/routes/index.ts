import { Router } from 'express';
import userRoutes from './user';
import companyRoutes from './company';
import companyUserRoutes from './companyUser';
import { refreshToken } from '../controllers/Token';

const rootRouter = Router();

rootRouter.use('/company', companyRoutes);
rootRouter.use('/user', userRoutes);
rootRouter.use('/company-user', companyUserRoutes);
rootRouter.post('/refresh-token', refreshToken);

export default rootRouter;
