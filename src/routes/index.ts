import { Router } from "express";
import userRoutes from "./user";
import companyRoutes from "./company";

const rootRouter = Router();

rootRouter.use("/user", userRoutes);
rootRouter.use("/company", companyRoutes);

export default rootRouter;
