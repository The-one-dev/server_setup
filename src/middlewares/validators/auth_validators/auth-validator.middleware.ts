import { RequestHandler } from "express";
import {
  ForgotPasswordPayload,
  LoginPayload,
  RegistrationPayload,
  ResetPasswordPayload,
} from "./auth-validator-interface";
import { authValidatorSchemas } from "./auth-validator-schema.middleware";
import { catchMiddlewareErrors } from "../../../utilities/functions/global-utilities";

declare global {
  namespace Express {
    interface Request {
      validRegistrationPayload?: RegistrationPayload;
      validLoginPayload?: LoginPayload;
      validForgotPasswordPayload?: ForgotPasswordPayload;
      validResetPasswordPayload?: ResetPasswordPayload;
    }
  }
}

// Validate registration data
const registrationPayload: RequestHandler = catchMiddlewareErrors(
  (req, res, next) => {
    const { value, error } = authValidatorSchemas.register.validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    });
    if (error) {
      throw error;
    }
    req.validRegistrationPayload = value as RegistrationPayload;
    next();
  }
);

// Validate login payload
const loginPayload: RequestHandler = catchMiddlewareErrors((req, res, next) => {
  const { value, error } = authValidatorSchemas.login.validate(req.body, {
    stripUnknown: true,
    abortEarly: false,
  });
  if (error) {
    throw error;
  }
  req.validLoginPayload = value as LoginPayload;
  next();
});

// Validate forgot password payload
const forgotPasswordPayload: RequestHandler = catchMiddlewareErrors(
  (req, res, next) => {
    const { value, error } = authValidatorSchemas.forgotPassword.validate(
      req.body,
      {
        stripUnknown: true,
        abortEarly: false,
      }
    );
    if (error) {
      throw error;
    }
    req.validForgotPasswordPayload = value as ForgotPasswordPayload;
    next();
  }
);

// Validate reset password
const resetPasswordPayload: RequestHandler = catchMiddlewareErrors(
  (req, res, next) => {
    const { value, error } = authValidatorSchemas.resetPassword.validate(
      req.body,
      {
        stripUnknown: true,
        abortEarly: false,
      }
    );
    if (error) {
      throw error;
    }
    req.validResetPasswordPayload = value as ResetPasswordPayload;
    next();
  }
);

export const authValidators = {
  registrationPayload,
  loginPayload,
  forgotPasswordPayload,
  resetPasswordPayload,
};
