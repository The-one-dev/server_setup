import { Request, Response, NextFunction, RequestHandler } from "express";
import { ResponseJson } from "../interfaces/global-interface";
import { SendResponse } from "../types/global-types";

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

export const safeMiddleware = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      return next(err);
    });
  };
};

export const safeFunction = <T extends (...args: any[]) => any>(fn: T) => {
  return (...args: Parameters<T>) => {
    const next = args[args.length - 1] as NextFunction;
    try {
      Promise.resolve(fn(...args)).catch((err) => {
        if (next) return next(err);
        throw err;
      });
    } catch (err) {
      if (next) return next(err);
      throw err;
    }
  };
};
