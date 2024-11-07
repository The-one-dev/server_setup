import express, { Application } from "express";
import { globalErrorHandler } from "./middlewares/error_handlers/error-handler.middleware";
import globalRouter from "./global-router";



const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(globalRouter);

app.use(globalErrorHandler);

export default app;
