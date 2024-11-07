import { RequestHandler } from "express";
import {
  catchMiddlewareErrors,
  sendResponse,
} from "../../utilities/functions/global-utilities";
import { ResponseObject } from "../../utilities/interfaces/global-interface";
import { RESPONSES } from "../../utilities/constants/responses.constant";
import sequelize from "../../configs/connections/sequelize-connection";

const getHome: RequestHandler = catchMiddlewareErrors(
  async (req, res, next) => {
    const message = RESPONSES.getHome;
    const deviceDetails = res.locals.deviceDetails;
    const response: ResponseObject = {
      statusCode: 200,
      message,
      data: deviceDetails,
    };
    return sendResponse(res, response);
  }
);

const getHealth: RequestHandler = catchMiddlewareErrors((req, res, next) => {
  const message = RESPONSES.getHealth;
  const response: ResponseObject = {
    statusCode: 200,
    message,
  };
  return sendResponse(res, response);
});

const clearDb: RequestHandler = catchMiddlewareErrors(
  async (req, res, next) => {
    await sequelize.sync({ force: true });
    const response: ResponseObject = {
      statusCode: 204,
    };
    return sendResponse(res, response);
  }
);

export const utilsControllers = {
  getHome,
  getHealth,
  clearDb,
};
