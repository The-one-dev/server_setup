import { Router } from "express";
import createError from "http-errors";
import { sendResponse } from "../utilities/functions/global-utilities";
import { ResponseObject } from "utilities/functions/interfaces/global-interface";

const homeRoutes = Router();

homeRoutes.get("/", async (req, res) => {
  const message = "Welcome to the Time sheet API!";
  const response: ResponseObject = { statusCode: 200, message };
  sendResponse(res, response);
});

homeRoutes.get("/throw-error", async (req, res, next) => {
  console.log("inside the throw error controller");
  return next(
    new createError.InternalServerError(
      "This error is intentionally thrown to test the Error handler... "
    )
  );
});

export default homeRoutes;
