import { Router } from "express";
import { authValidators } from "../middlewares/validators/auth_validators/auth-validator.middleware";
import { authControllers } from "../controllers/auth/auth-controllers";

const authRoutes = Router();

authRoutes.post(
  "/register",
  authValidators.registrationPayload,
  authControllers.register
);

authRoutes.post("/login", authValidators.loginPayload, authControllers.login);

authRoutes.post("/forgot-password", authValidators.forgotPasswordPayload);

authRoutes.post("/reset-password", authValidators.resetPasswordPayload);

export default authRoutes;
