import { ErrTokenIsRequired, getErrorMessage } from "../../errors/index.js";
import { verifyAuthToken } from "../services/security/tokenService.js";


const _getAuthToken = (req) => {
  const authHeader = req.get("Authorization");
  if (!authHeader || authHeader.split(" ")[0] !== "Bearer") {
    throw ErrTokenIsRequired;
  }
  return authHeader.split(" ")[1];
};

export const authenticateUser = async (req, res, next) => {
  try {
    const token = _getAuthToken(req);
    const decodedToken = await verifyAuthToken(token);

    req.user = {
      _id: decodedToken._id,
      user_uuid: decodedToken.publicId,
    };

    next();
  } catch (error) {
    const err = getErrorMessage(error);
    res.status(err.code).json({
      error: err,
    });
  }
};
