import { Application, Router } from "express";
import { BASE_URL } from "./utilities/constants";
import utilityRoutes from "./routes/utils-route";
import createError from "http-errors";
import { utilities } from "./middlewares/utilities/utilities";
import authRoutes from "./routes/auth-route";
import organizationRouter from "./routes/organizations/organization-routes";
import employeeRouter from "./routes/employees/employee-routes";
import adminRouter from "./routes/admin/admin-routes";
import protectedRoutesHandler from "./routes/protected-route";

const globalRouter = Router();

globalRouter.use(utilities.captureDevice);

globalRouter.use(utilities.requestLogger);

globalRouter.use(`${BASE_URL}`, utilityRoutes);

globalRouter.use(`${BASE_URL}/auth`, authRoutes);

globalRouter.use(`${BASE_URL}/p`, protectedRoutesHandler);

globalRouter.all("*", async (req, res, next) => {
  const message = `Either ${req.method.toUpperCase()} method is not supported for '${req.url.toString()}' OR, The requested resource is not available.`;
  return next(new createError.NotFound(message));
});

export default globalRouter;
