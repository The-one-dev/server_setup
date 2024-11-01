import { Router } from "express";
import { authMiddlewares } from "../../middlewares/auth/auth-middleware";

const adminRouter = Router();

adminRouter.use(authMiddlewares.restrictToAdmin);

export default adminRouter;
