import createError from "http-errors";
import { userServices } from "../../services/users/user-services";
import { ResponseObject } from "../../utilities/interfaces/global-interface";
import { RESPONSES } from "../../utilities/constants/responses.constant";
import {
  catchMiddlewareErrors,
  sendResponse,
} from "../../utilities/functions/global-utilities";
import { ERRORS } from "../../utilities/constants/errors.constant";
import { authUtilities } from "../../utilities/functions/auth-utilities";

const register = catchMiddlewareErrors(async (req, res, next) => {
  const validRegistrationPayload = { ...req.validRegistrationPayload };
  const registeredUser = await userServices.saveUser(validRegistrationPayload);
  const response: ResponseObject = {
    statusCode: 201,
    message: RESPONSES.userRegistered,
    data: {
      user: registeredUser,
    },
  };
  return sendResponse(res, response);
});

const login = catchMiddlewareErrors(async (req, res, next) => {
  const validLoginPayload = { ...req.validLoginPayload };

  const userExists = await userServices.findUserByEmail(
    validLoginPayload.email
  );
  if (!userExists) throw new createError.NotFound(ERRORS.emailNotFound);

  const isPasswordValid = await userExists.validatePassword(
    validLoginPayload.password
  );
  if (!isPasswordValid)
    throw new createError.Unauthorized(ERRORS.invalidPassword);

  const user = userExists.toJSON();

  const accessTokenPayload = { email: user.email, role: user.role };
  const accessToken = authUtilities.getAccessToken(accessTokenPayload);

  const response: ResponseObject = {
    statusCode: 200,
    message: RESPONSES.userLoggedIn,
    data: { accessToken },
  };
  return sendResponse(res, response);
});

export const authControllers = {
  register,
  login,
};
