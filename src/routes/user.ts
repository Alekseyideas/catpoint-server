import { Router } from "express";
import { createUser } from "../controllers/User";

const router = Router();

router.post("/create", createUser);

export default router;
