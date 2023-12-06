import Joi from "joi";


export const createPostValidator = Joi.object({
    title : Joi.string().required(),
    contentBody :Joi.string().required(),
    category: Joi.string().required(),
})


export const editPostValidator = Joi.object({
    title : Joi.string(),
    contentBody :Joi.string(),
    category: Joi.string(),
})
