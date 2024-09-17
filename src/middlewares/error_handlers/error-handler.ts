import { ErrorRequestHandler } from "express";
import { ValidationError as joiValidationError } from "joi";
import { HttpError } from "http-errors";
import { sendResponse } from "../../utilities/functions/global-utilities";

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
    sendResponse(res, err.status, err.message);
  }

  //TODO: to be continued
};
