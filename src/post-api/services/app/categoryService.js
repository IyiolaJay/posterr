import Category from "../../../database/models/category.js";
import {
  ErrResourceAlreadyExists,
  ErrResourceNotFound,
  ErrMissingKeyFields,
} from "../../../errors/index.js";

/**
 * @description  Create Category
 * @param (category Object)
 * @returns created category
 */
const createCategoryService = async (userReq) => {
  const { title } = userReq;

  const category = await Category.findOne({
    title: { $regex: new RegExp(title, "i") },
  });
  if (category) throw ErrResourceAlreadyExists;

  const newCategory = await Category.create({
    ...userReq,
  });

  return newCategory;
};

/**
 * @description  Fetch all Category
 * @param (None)
 * @returns All categories
 */
const allCategoriesService = async () => {
  const categories = await Category.find()
    .select("title description category_uuid")
    .lean();
  return categories;
};

/**
 * @description  Edit Category
 * @param (category_uuid , category Object)
 * @returns Edited category
 */
const editCategoryService = async (categoryId, userReq) => {
  const { title, description } = userReq;
  if (!title || !description) throw ErrMissingKeyFields;

  const category = await Category.findOneAndUpdate(
    { category_uuid: categoryId },
    { ...userReq },
    { new: true }
  );
  if (!category) throw ErrResourceNotFound;
  return category;
};

/**
 * @description  Delete Category
 * @param (category_uuid)
 * @returns null
 */
const deleteCategoryService = async (categoryId) => {
  const category = await Category.findOne({ category_uuid: categoryId })
    .select("_id")
    .lean();

  if (!category) throw ErrResourceNotFound;
  await Category.deleteOne({ _id: category._id });
  return;
};

export const CategoryService = {
  createCategoryService,
  allCategoriesService,
  editCategoryService,
  deleteCategoryService,
};
