import dotenv from "dotenv";
import express, { Application } from "express";
import { globalErrorHandler } from "./middlewares/error_handlers/error-handler";
import { router } from "./router";

dotenv.config();

const app: Application = express();

app.use(express.json());

router(app);

app.use(globalErrorHandler);

export default app;
