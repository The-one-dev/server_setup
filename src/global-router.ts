import { Router } from "express";
import { CONSTANTS } from "./utilities/constants/values.constant";
import utilityRoutes from "./routes/utils-route";
import createError from "http-errors";
import { utilities } from "./middlewares/utilities/utilities.middleware";
import authRoutes from "./routes/auth-route";
import protectedRoutesHandler from "./routes/protected-route";

const globalRouter = Router();

globalRouter.use(utilities.captureDevice);

globalRouter.use(utilities.requestLogger);

globalRouter.use(`${CONSTANTS.baseUrl}`, utilityRoutes);

globalRouter.use(`${CONSTANTS.baseUrl}/auth`, authRoutes);

globalRouter.use(`${CONSTANTS.baseUrl}/p`, protectedRoutesHandler);

globalRouter.all("*", async (req, res, next) => {
  const message = `Either ${req.method.toUpperCase()} method is not supported for '${req.url.toString()}' OR, The requested resource is not available.`;
  return next(new createError.NotFound(message));
});

export default globalRouter;
