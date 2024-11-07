import { Router } from "express";
import adminRouter from "./admin/admin-routes";
import { authMiddlewares } from "../middlewares/auth/auth.middleware";
import userRouter from "./users/user-router";

const protectedRoutesHandler = Router();

protectedRoutesHandler.use(authMiddlewares.authenticator);

protectedRoutesHandler.use("/", userRouter);

protectedRoutesHandler.use("/admin", adminRouter);

export default protectedRoutesHandler;
