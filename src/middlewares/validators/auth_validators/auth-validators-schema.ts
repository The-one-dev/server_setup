import Joi from "joi";

const name = Joi.string()
  .pattern(/^([a-z]|[A-Z])+$/)
  .min(3)
  .max(25);

const email = Joi.string().email().lowercase();

const password = Joi.string()
  .min(6)
  .pattern(new RegExp("^[a-zA-Z0-9~`! @#$%^&*()_+={[}]|-:;\"'<,>.?/]{6,30}$"));

const role = Joi.string()
  .lowercase()
  .valid("organization", "superadmin", "employee")
  .default("organization");

export const authValidatorSchemas = {
  //signing up data validator.
  register: Joi.object().keys({
    firstName: name.required(),
    lastName: name.required(),
    email: email.required(),
    organizationName: name.required(),
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
