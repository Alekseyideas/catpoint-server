import { Router } from 'express';
import { signIn, signUp, getCompanies, getCompany } from '../controllers/Company';

const router = Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/', getCompany);
router.get('/all', getCompanies);

export default router;
