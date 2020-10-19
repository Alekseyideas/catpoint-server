import { Router } from "express";
import { getUser, signUp } from "../controllers/User";

const router = Router();

router.post("/sign-up", signUp);
router.get("/", getUser);

export default router;
