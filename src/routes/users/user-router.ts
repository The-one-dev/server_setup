import { Router } from "express";
import { authMiddlewares } from "../../middlewares/auth/auth.middleware";
import postRoutes from "./post-routes";

const userRouter = Router();

userRouter.use(authMiddlewares.restrictToUser);

userRouter.use("/posts", postRoutes);

export default userRouter;
