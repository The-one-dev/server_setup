import { Router } from "express";
import { authValidators } from "../middlewares/validators/auth_validators/auth-validator";

const authRoutes = Router();

authRoutes.post("/register", authValidators.registrationPayload);

authRoutes.post("/login", authValidators.loginPayload);

authRoutes.post("/forgot-password", authValidators.forgotPasswordPayload);

authRoutes.post("/reset-password", authValidators.resetPasswordPayload);

export default authRoutes;
