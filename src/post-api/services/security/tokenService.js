import jwt from "jsonwebtoken";

export const generateAuthToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

export const verifyAuthToken = async (token) => {
  const isValid = jwt.verify(token, process.env.JWT_SECRET);
  return isValid;
};
