import {
  ErrEmailAlreadyExists,
  ErrInvalidPassword,
  ErrUserNotFound,
  ErrInvalidOTP,
} from "../../../errors/index.js";
import {
  hashPassword,
  comparePassword,
  generateAndSendOTP,
} from "../../utils/auth.js";
import User from "../../../database/models/user.js";
import { generateAuthToken } from "../security/tokenService.js";

/**
 * @description  Create a User Account
 * @param (userReq)
 * @returns user object
 */
const createUserAccountService = async (userReq) => {
  const { email, password } = userReq;

  const user = await User.findOne({ email }).select("_id").lean();

  if (user) throw ErrEmailAlreadyExists;

  const hp = await hashPassword(password);

  const newCustomer = await User.create({
    ...userReq,
    password: hp,
  });

  return newCustomer;
};

/**
 * @description   User login
 * @param (email & password )
 * @returns user object & Token
 */
 const userLoginService = async (email, password) => {
  const findUser = await User.findOne({ email });
  if (!findUser) throw ErrUserNotFound;

  const passwordCompare = await comparePassword(password, findUser.password);
  if (!passwordCompare) throw ErrInvalidPassword;

  const payload = {
    _id: findUser._id,
    user_uuid: findUser.user_uuid,
  };

  const token = await generateAuthToken(payload);

  return { findUser, token };
};

/**
 * @description  Forgot Password - Generate OTP to reset password
 * @param (email )
 * @returns null
 */
 const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email }).select("_id").lean();
  if (!user) throw ErrUserNotFound;
  const otpCode = await generateAndSendOTP(email);
  await User.updateOne({ _id: user._id }, { otpCode: otpCode });
  return;
};

/**
 * @description  Update Password with OTP
 * @param (email, Otp )
 * @returns null
 */
const changeUserPasswordService = async (code, password) => {
  const user = await User.findOne({ otpCode: code }).select("_id");
  if (!user) {
    throw ErrInvalidOTP;
  }
  const hp = await hashPassword(password);

  await User.updateOne(
    { _id: user._id },
    { password: hp, $unset: { otpCode: 1 } },
    { new: true }
  );
  return;
};

const socialAuthService = async (userObj )=>{
  let findUser;
  findUser = await User.findOne({ email : userObj.email });

  if(!findUser){
   findUser = await User.create({
      email: userObj.email,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      user_uuid : userObj.id,
    });

  }
  const payload = {
    _id: findUser._id,
    user_uuid: findUser.user_uuid,
  };

  const token = await generateAuthToken(payload);

  return {token , user : findUser.email}
}

export const AuthService = {
  createUserAccountService,
  userLoginService,
  forgotPasswordService,
  changeUserPasswordService,
  socialAuthService,
};
