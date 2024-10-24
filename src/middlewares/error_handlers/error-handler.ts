import { ErrorRequestHandler } from "express";
import { ValidationError as joiValidationError } from "joi";
import { HttpError } from "http-errors";
import { sendResponse } from "../../utilities/functions/global-utilities";
import { ResponseObject } from "utilities/functions/interfaces/global-interface";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err instanceof joiValidationError) {
    const statusCode = 400;
    console.error("Validation Error");
  }

  if (err instanceof HttpError) {
    console.error(`HTTP Error: ${err.status} - ${err.message}`); //TODO: add the logger here.

    const responseObject: ResponseObject = {
      statusCode: err.status,
      message: err.message,
    };

    sendResponse(res, responseObject);
  }

  //TODO: to be continued
};
