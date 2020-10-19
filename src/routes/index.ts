import { Router } from "express";
import userRoutes from "./user";
import companyRoutes from "./company";
import { refreshToken } from "../controllers/Token";

const rootRouter = Router();

rootRouter.use("/company", companyRoutes);
rootRouter.use("/user", userRoutes);
rootRouter.post("/refresh-token", refreshToken);

export default rootRouter;
