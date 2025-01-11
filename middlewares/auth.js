import UserModel from "../Models/UserModel.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHanlder.js";
import jwt from "jsonwebtoken";

//authenticated user
export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Please login first");
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await UserModel.findById(decodedData._id);
  next();
});

//admin
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(401, "you are Unauthorized");
    }

    next();
  };
};
