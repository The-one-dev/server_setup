import { NextFunction, Request, Response } from "express";
import { ResponseJson } from "./interfaces/global-interface";
import { CatchAsyncErrorsWrapper, SendResponse } from "./types/global-types";

//wrapper function that handles try and catch for request handlers
export const catchAsync: CatchAsyncErrorsWrapper = (fn) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

//function that sends the response to the client
// export const sendResponse: SendResponse = (res, statusCode, message, data) => {
//   if (statusCode === 204) {
//     return res.status(204).end();
//   }

//   let responseJson: ResponseJson = {
//     status: String(statusCode).startsWith("2") ? "success" : "fail",
//   };

//   if (message) responseJson.message = message;

//   if (data && typeof data === "object") responseJson.data = data;

//   return res.status(statusCode).json(responseJson);
// };

export const sendResponse: SendResponse = (res, responseObject) => {
  if (responseObject.statusCode === 204) {
    return res.status(204).end();
  }

  let responseJson: ResponseJson = {
    status: String(responseObject.statusCode).startsWith("2")
      ? "success"
      : "fail",
  };

  responseObject.message && (responseJson["message"] = responseObject.message);

  responseObject.data && (responseJson["data"] = responseObject.data);

  return res.status(responseObject.statusCode).json(responseJson);
};
