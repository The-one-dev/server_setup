import { Application, Request, Response } from "express";
import { BASE_URL } from "./utilities/constants";
import homeRoutes from "./routes/home-route";
import createError from "http-errors";
import { utilities } from "./middlewares/utilities/utilities";

export const router = (app: Application) => {
  app.use(utilities.captureDeviceDetails);

  app.use(`${BASE_URL}`, homeRoutes);

  app.use(`${BASE_URL}/auth`, async (req, res) => {});

  app.use(`${BASE_URL}/org`, async (req, res) => {});

  app.use(`${BASE_URL}/time-sheet`, async (req, res) => {});

  app.use(`${BASE_URL}/admin`, async (req, res, next) => {});

  app.all("*", async (req, res, next) => {
    const message = `Either ${req.method.toUpperCase()} method is not supported for '${req.url.toString()}' OR, The requested resource is not available.`;
    return next(new createError.NotFound(message));
  });
};
