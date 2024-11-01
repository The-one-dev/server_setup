import { Router } from "express";
import { authMiddlewares } from "../../middlewares/auth/auth-middleware";

const employeeRouter = Router();

employeeRouter.use(authMiddlewares.restrictToEmployee);

export default employeeRouter;
