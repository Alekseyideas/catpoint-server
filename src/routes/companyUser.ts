import { Router } from 'express';
import { addPoint, getUserCompanies } from '../controllers/CompanyUser';

const router = Router();

router.post('/add-point', addPoint);
router.get('/companies', getUserCompanies);

export default router;
