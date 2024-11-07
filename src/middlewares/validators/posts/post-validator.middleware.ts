import { RequestHandler } from "express";
import { catchMiddlewareErrors } from "../../../utilities/functions/global-utilities";
import { PostAttributes } from "../../../models/model-interfaces";
import postSchema from "./post-validator-schema.middleware";

declare global {
  namespace Express {
    interface Request {
      validPostPayload?: PostAttributes;
    }
  }
}

export const postValidator: RequestHandler = catchMiddlewareErrors(
  (req, res, next) => {
    const { value, error } = postSchema.validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    });
    if (error) {
      throw error;
    }

    req.validPostPayload = value as PostAttributes;
    req.validPostPayload.userId = req.user.id;
    next();
  }
);
