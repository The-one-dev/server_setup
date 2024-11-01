import { Router } from "express";
import { utilsControllers } from "../controllers/utils/utils-controller";

const utilityRoutes = Router();

utilityRoutes.get("/", utilsControllers.getHome);

utilityRoutes.get("/health", utilsControllers.getHealth);

export default utilityRoutes;
