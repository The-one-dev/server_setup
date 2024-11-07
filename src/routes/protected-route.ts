import { Router } from "express";
import adminRouter from "./admin/admin-routes";
import { authMiddlewares } from "../middlewares/auth/auth.middleware";
import userRouter from "./users/user-router";

const protectedRoutesHandler = Router();

protectedRoutesHandler.use(authMiddlewares.authenticator);

protectedRoutesHandler.use("/admin", adminRouter);

protectedRoutesHandler.use("/", userRouter);

export default protectedRoutesHandler;
