import { Router } from "express";
import { authMiddlewares } from "../../middlewares/auth/auth.middleware";

const userRouter = Router();

userRouter.use(authMiddlewares.restrictToOrganization);

userRouter.post("/teams", (req, res, next) => {
  res.status(200).json({ message: "this is a protected route man" });
});

export default userRouter;
