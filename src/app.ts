import dotenv from "dotenv";
import express, { Application } from "express";
import { globalErrorHandler } from "./middlewares/error_handlers/error-handler";
import globalRouter from "./global-router";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use(globalRouter);

app.use(globalErrorHandler);

export default app;
