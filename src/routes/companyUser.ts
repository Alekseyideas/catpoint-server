import { Router } from 'express';
import { getUserCompanies } from '../controllers/CompanyUser';

const router = Router();

router.get('/companies', getUserCompanies);

export default router;
