import jwt from "jsonwebtoken";
import ApiResponse from "./ApiResponse.js";

export const sendAuthToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
  };

  return res
    .status(code)
    .cookie("token", token, cookieOptions)
    .json(new ApiResponse(200, user, message));
};

export const clearAuthToken = (res, code, message) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(code)
    .clearCookie("token", cookieOptions)
    .json(new ApiResponse(200, null, message));
};
