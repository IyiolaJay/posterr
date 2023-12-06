import Joi from "joi";


export const createCategoryValidator = Joi.object({
    title : Joi.string().required(),
    description :Joi.string().required(),
    categoryId : Joi.string().required(),
})

