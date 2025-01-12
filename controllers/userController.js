import UserApiFeatures from "../features/userApiFeatures.js";
import UserModel from "../Models/UserModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHanlder.js";

//get users
export const getUsersController = asyncHandler(async (req, res) => {
  const resultPerPage = req.query.limit ? req.query.limit : 5;
  let apiFeature = new UserApiFeatures(
    UserModel.find({}),
    req.query && req.query
  )
    .search()
    .pagination(resultPerPage);

  let users = await apiFeature.query;

  return res.json(new ApiResponse(200, users, null));
});

//get user
export const getUserController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  return res.json(new ApiResponse(200, user, null));
});

//send request
export const sendUserRequestController = asyncHandler(async (req, res) => {});
