import { RegistrationPayload } from "../interfaces/request-body-interfaces";
import { RequestValidator } from "../types/validators-types";
import { authValidatorSchemas } from "./auth-validators-schema";

declare global {
  namespace Express {
    interface Request {
      validRegistrationPayload?: RegistrationPayload;
    }
  }
}

//validate registration data
export const validateRegistrationPayload: RequestValidator = (
  req,
  res,
  next
) => {
  const { value, error } = authValidatorSchemas.register.validate(req.body);
  if (error) {
    console.log(error);
    next(error);
  }
  req.validRegistrationPayload = value as RegistrationPayload;
  next();
};
