import { RequestHandler } from "express";
import {
  safeMiddleware,
  sendResponse,
} from "../../utilities/functions/global-utilities";
import { ResponseObject } from "../../utilities/interfaces/global-interface";

const getHome: RequestHandler = safeMiddleware(async (req, res, next) => {
  const message = "Welcome to the Time sheet API!";
  const deviceDetails = res.locals.deviceDetails;
  const response: ResponseObject = {
    statusCode: 200,
    message,
    data: deviceDetails,
  };
  return sendResponse(res, response);
});

const getHealth: RequestHandler = safeMiddleware((req, res, next) => {
  const message = "The Time sheet API is healthy!";
  const response: ResponseObject = {
    statusCode: 200,
    message,
  };
  return sendResponse(res, response);
});

export const utilsControllers = {
  getHome,
  getHealth,
};
