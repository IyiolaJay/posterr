import { Router } from "express";
import { allPosts, createPost, deletePost, editPost, getSinglePost } from "../controllers/post.js";
import {validateRequest} from "../utils/api.utils.js"
import { authenticateUser } from "../middlewares/auth.js";
import { createPostValidator, editPostValidator } from "../middlewares/validators/postValidator.js";

//
const routes = Router();

routes.get("/post/all", allPosts);
routes.get("/post/:postId", getSinglePost);
routes.put("/post/create", validateRequest(createPostValidator), authenticateUser ,createPost);
routes.patch("/post/edit/:postId", validateRequest(editPostValidator), authenticateUser, editPost);
routes.delete("/post/delete/:postId",  authenticateUser, deletePost);



export default routes;