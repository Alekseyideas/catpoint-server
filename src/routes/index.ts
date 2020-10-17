import { Router } from "express";
import userRoutes from "./user";
import companyRoutes from "./company";
import isAuth from "../middleware/isUserAuth";

const rootRouter = Router();

rootRouter.use("/company", isAuth, companyRoutes);
rootRouter.use("/user", isAuth, userRoutes);

export default rootRouter;
