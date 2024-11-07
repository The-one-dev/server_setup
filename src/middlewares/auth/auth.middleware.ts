import jwt from "jsonwebtoken";
import { Request, RequestHandler } from "express";
import { catchMiddlewareErrors } from "../../utilities/functions/global-utilities";
import { ERRORS } from "../../utilities/constants/errors.constant";
import createError from "http-errors";
import { VerifiedToken } from "./auth-interfaces.middleware";
import { userServices } from "../../services/users/user-services";
import { UserAttributes } from "../../models/model-interfaces";
import { CONSTANTS } from "../../utilities/constants/values.constant";

declare global {
  namespace Express {
    interface Request {
      user: UserAttributes;
    }
  }
}

const getTokenFromHeader = (req: Request): string => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    throw new createError.Unauthorized(ERRORS.notAuthToken);
  }

  const bearer = authHeader.split(" ")[0];
  if (!bearer || bearer !== "Bearer") {
    throw new createError.Unauthorized(ERRORS.invalidAuthToken);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new createError.Unauthorized(ERRORS.notAuthToken);
  }

  return token;
};

const verifyAccessToken = (token: string): Promise<VerifiedToken> => {
  return new Promise((resolve, reject) => {
    const secret = process.env.JWT_SECRET_KEY;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(new createError.Unauthorized(ERRORS.invalidAuthToken));
      } else {
        resolve(decoded as VerifiedToken);
      }
    });
  });
};

const authenticator: RequestHandler = catchMiddlewareErrors(
  async (req, res, next) => {
    const token = getTokenFromHeader(req);

    const decodedToken = await verifyAccessToken(token);

    const user = await userServices.findUserByEmail(decodedToken.email);

    if(!user) {
      throw new createError.Unauthorized(ERRORS.invalidAuthToken);
    }

    req.user = { ...user.toJSON() };

    return next();
  }
);

const restrictToUser: RequestHandler = catchMiddlewareErrors(
  async (req, res, next) => {
    const isUser = req.user.role === CONSTANTS.roles.user;
    const isAdmin = req.user.role === CONSTANTS.roles.superAdmin;
    if (!(isUser || isAdmin)) {
      throw new createError[403](ERRORS.notPermitted);
    }
    return next();
  }
);

const restrictToEmployee: RequestHandler = catchMiddlewareErrors(
  async (req, res, next) => {
    return next();
  }
);

const restrictToAdmin: RequestHandler = catchMiddlewareErrors(
  async (req, res, next) => {
    const isAdmin = req.user.role === CONSTANTS.roles.superAdmin;
    if (!isAdmin) {
      throw new createError[403](ERRORS.notPermitted);
    }
    return next();
  }
);

export const authMiddlewares = {
  authenticator,
  restrictToUser,
  restrictToEmployee,
  restrictToAdmin,
};
