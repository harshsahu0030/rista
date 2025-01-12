import jwt from "jsonwebtoken";
import ApiResponse from "./ApiResponse.js";

export const sendAuthToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  const cookieOptions = {
    Expires: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
  };

  return res
    .cookie("token", token, cookieOptions)
    .json(new ApiResponse(code, user, message));
};

export const clearAuthToken = (res, code, message) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .clearCookie("token", cookieOptions)
    .json(new ApiResponse(code, null, message));
};
