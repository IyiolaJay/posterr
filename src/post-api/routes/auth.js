import { Router } from "express";

import { validateRequest } from "../utils/api.utils.js";
import {
  forgotPasswordValidator,
  loginValidator,
  signupValidator,
  updatePasswordValidator,
} from "../middlewares/validators/authValidators.js";
import {
  changeUserPassword,
  createAccount,
  forgotPassword,
  userLogin,
} from "../controllers/auth.js";


const routes = Router();

routes.put("/user/sign-up", validateRequest(signupValidator), createAccount);
routes.post("/user/sign-in", validateRequest(loginValidator), userLogin);
routes.post(
  "/user/reset",
  validateRequest(forgotPasswordValidator),
  forgotPassword
);
routes.post(
  "/user/change/:otp",
  validateRequest(updatePasswordValidator),
  changeUserPassword
);


export default routes;
