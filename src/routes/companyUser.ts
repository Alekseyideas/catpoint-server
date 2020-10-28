import { Router } from 'express';
import { addPoint } from '../controllers/CompanyUser';

const router = Router();

router.post('/add-point', addPoint);

export default router;
