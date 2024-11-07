import { ErrorRequestHandler } from "express";
import { ValidationError as joiValidationError } from "joi";
import { HttpError } from "http-errors";
import { sendResponse } from "../../utilities/functions/global-utilities";
import { ResponseObject } from "../../utilities/interfaces/global-interface";
import { ERRORS } from "../../utilities/constants/errors.constant";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let responseObject: ResponseObject;

  //handle validation errors
  if (err instanceof joiValidationError) {
    const errors = err.details.map((detail) => {
      let message = detail.message;
      // message.replace(/"+/g, "");
      return message;
    });
    responseObject = {
      statusCode: 400,
      message: `Validation error: ${errors}`,
    };
    console.error(`${err.name}: ${err.message}`);
  }
  //handle http errors
  else if (err instanceof HttpError) {
    const isServerError = err.statusCode >= 500;
    responseObject = {
      statusCode: err.statusCode,
      message: isServerError ? ERRORS.serverError : err.message,
    };
    console.error(`${err.status}: ${err.message}`);
  }
  //handle other errors as internal server error
  else {
    responseObject = {
      statusCode: 500,
      message: ERRORS.serverError,
    };
    console.error((err as Error).stack);
  }

  return sendResponse(res, responseObject);
};
