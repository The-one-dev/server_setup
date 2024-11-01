import { Router } from "express";
import { BASE_URL } from "../utilities/constants";
import organizationRouter from "./organizations/organization-routes";
import employeeRouter from "./employees/employee-routes";
import adminRouter from "./admin/admin-routes";
import { authMiddlewares } from "../middlewares/auth/auth-middleware";

const protectedRoutesHandler = Router();

protectedRoutesHandler.use(authMiddlewares.authenticator);

protectedRoutesHandler.use("/org", organizationRouter);

protectedRoutesHandler.use("/employees", employeeRouter);

protectedRoutesHandler.use("/admin", adminRouter);

export default protectedRoutesHandler;
