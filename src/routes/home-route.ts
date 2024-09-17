import { Router } from "express";
import { sendResponse } from "../utilities/functions/global-utilities";

const homeRoutes = Router();

homeRoutes.get("/", async (req, res) => {
  const message = "Welcome to the Time sheet API!";
  sendResponse(res, 200, message);
});

homeRoutes.get("/throw-error", async (req, res, next) => {
  next(new Error("This error is intentionally thrown... "));
});

export default homeRoutes;
