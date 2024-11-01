import { RequestHandler } from "express";
import { safeMiddleware } from "../../utilities/functions/global-utilities";
// import createHttpError from "http-errors";

const authenticator: RequestHandler = safeMiddleware(async (req, res, next) => {
  return next();
});

const restrictToOrganization: RequestHandler = safeMiddleware(
  async (req, res, next) => {
    return next();
  }
);

const restrictToEmployee: RequestHandler = safeMiddleware(
  async (req, res, next) => {
    return next();
  }
);

const restrictToAdmin: RequestHandler = safeMiddleware(
  async (req, res, next) => {
    return next();
  }
);

export const authMiddlewares = {
  authenticator,
  restrictToOrganization,
  restrictToEmployee,
  restrictToAdmin,
};
