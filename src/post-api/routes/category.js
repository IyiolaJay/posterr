import { Router } from "express";
import {
  allCategories,
  createCategory,
  deleteCategory,
  editCategory,
} from "../controllers/category.js";
import { validateRequest } from "../utils/api.utils.js";
import { createCategoryValidator } from "../middlewares/validators/categoryValidator.js";
import { authenticateUser } from "../middlewares/auth.js";
const routes = Router();

routes.get("/category/all", allCategories);
routes.put(
  "/category/create",
  authenticateUser,
  validateRequest(createCategoryValidator),
  createCategory
);
routes.patch("/category/edit/:categoryId", authenticateUser, editCategory);
routes.delete("/category/delete/:categoryId", authenticateUser, deleteCategory);

export default routes;
