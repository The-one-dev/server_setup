import { Router } from "express";
import { postValidator } from "../../middlewares/validators/posts/post-validator.middleware";
import { postControllers } from "../../controllers/post/post-controllers";

const postRoutes = Router();

postRoutes.post("/", postValidator, postControllers.createPost);

postRoutes.put("/:id", postValidator, postControllers.updateAPost);

postRoutes.get("/", postControllers.getAllPosts);

postRoutes.get("/:id", postControllers.getAPost);

postRoutes.delete("/:id", postControllers.deletePost);

export default postRoutes;
