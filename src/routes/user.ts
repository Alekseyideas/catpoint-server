import { Router } from "express";
import { signUp } from "../controllers/User";

const router = Router();

router.post("/sign-up", signUp);

export default router;
