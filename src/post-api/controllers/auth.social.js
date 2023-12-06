import { AuthService } from "../services/app/authService.js";


//
export const socialAuthController = async (req, res) => {
  try {
    const data = req.user;
    const userCred = await AuthService.socialAuthService(data);
    return res.status(200).json({
      token: userCred.token,
      user: userCred.user,
    });
  } catch (error) {
    console.log(error);
    const result = getErrorMessage(error);
    return res.status(result.code).json({ error: result });
  }
};
