import {CategoryService} from "../services/app/categoryService.js";
import { getErrorMessage } from "../../errors/index.js";

export const createCategory = async (req, res) => {
  try {
    const userReq = req.body;
    const category = await CategoryService.createCategoryService(userReq);
    return res
      .status(201)
      .json({ message: "Category created successfully!", data: category });
  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({ error: result });
  }
};



export const allCategories = async(_, res)=>{
    try {
        const categories = await CategoryService.allCategoriesService();
        return res
          .status(200)
          .json({ message: "success", data: categories });
      } catch (error) {
        console.log(error);
        const result = getErrorMessage(error);
        return res.status(result.code).json({ error: result });
      }

}

export const editCategory = async(req, res)=> {
    try{
    const categoryId  = req.params.categoryId;
    const body = req.body;

    const category = await CategoryService.editCategoryService(categoryId, body);
    return res
          .status(200)
          .json({ message: "success", data: category });
      } catch (error) {
        console.log(error);
        const result = getErrorMessage(error);
        return res.status(result.code).json({ error: result });
      }

}

export const deleteCategory = async(req, res)=>{
    try{
        const categoryId  = req.params.categoryId;
    
         await CategoryService.deleteCategoryService(categoryId,);
        return res
              .status(200)
              .json({ message: "success, category deleted", });
          } catch (error) {
            console.log(error);
            const result = getErrorMessage(error);
            return res.status(result.code).json({ error: result });
          }
}

