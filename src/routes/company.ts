import { Router } from 'express';
import { signIn, signUp, getCompanies } from '../controllers/Company';

const router = Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/all', getCompanies);

export default router;
