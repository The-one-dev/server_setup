import { Router } from "express";
import { authMiddlewares } from "../../middlewares/auth/auth-middleware";

const organizationRouter = Router();

organizationRouter.use(authMiddlewares.restrictToOrganization);

organizationRouter.post("/teams", (req, res, next) => {
  res.status(200).json({ message: "this is a protected route man" });
});

export default organizationRouter;
