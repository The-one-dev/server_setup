import Joi, { string } from "joi";
import { ROLES } from "../../../utilities/constants";

const name = Joi.string()
  .pattern(/^([a-z]|[A-Z])+$/)
  .min(3)
  .max(30);

const email = Joi.string().email().lowercase().messages({
  "string.email": "Email must be a valid email address",
  "string.empty": "Email cannot be empty",
  "any.required": "Email is required",
});

const password = Joi.string()
  .min(8)
  .pattern(
    new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[~`!@#$%^&*()_+={[}\\]|:;\"'<,>.?/\\\\-]).{8,30}$"
    )
  )
  .messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have at least 8 characters",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    "any.required": "Password is required",
  });

const role = Joi.string()
  .lowercase()
  .valid(...ROLES)
  .default(ROLES[1]);

export const authValidatorSchemas = {
  //signing up data validator.
  register: Joi.object().keys({
    firstName: name.required().messages({
      "string.base": "First name must be a string",
      "string.empty": "First name cannot be empty",
      "string.min": "First name should have at least 3 characters",
      "string.max": "First name should not exceed 30 characters",
      "any.required": "First name is required",
    }),
    lastName: name.required().messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name cannot be empty",
      "string.min": "Last name should have at least 3 characters",
      "string.max": "Last name should not exceed 30 characters",
      "any.required": "Last name is required",
    }),
    email: email.required(),
    organizationName: name.required().messages({
      "string.base": "Organization name must be a string",
      "string.empty": "Organization name cannot be empty",
      "string.min": "Organization name should have at least 3 characters",
      "string.max": "Organization name should not exceed 30 characters",
      "any.required": "Organization name is required",
    }),
    password: password.required(),
    role,
  }),

  //logging in data validator.
  login: Joi.object().keys({
    email: email.required(),
    password: password.required(),
  }),

  //forgot password validator
  forgotPassword: Joi.object().keys({
    email: email.required(),
  }),

  //reset password validator
  resetPassword: Joi.object().keys({
    newPassword: password.required(),
  }),
};
