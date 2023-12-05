import Joi from "joi";

export const signupValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password:Joi.string().min(8).required(),
  });


export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
  

export const forgotPasswordValidator = Joi.object({
  email: Joi.string().email().required(),
})

export const updatePasswordValidator = Joi.object({
  password:Joi.string().min(8).required(),
})