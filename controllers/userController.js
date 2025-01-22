import UserApiFeatures from "../features/userApiFeatures.js";
import UserModel from "../Models/UserModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHanlder.js";
import { userIncludes, UserRelation } from "../utils/Includes.js";

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

  const loginUser = await UserModel.findById(req.user._id);
  const user = await UserModel.findById(id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  let include = userIncludes(loginUser, user);

  return res.json(new ApiResponse(200, { status: include, user }, null));
});

//send request
export const sendUserRequestController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const loginUser = await UserModel.findById(req.user._id);
  const user = await UserModel.findById(id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  let include = userIncludes(loginUser, user);

  await new UserRelation(include)
    .self()
    .friends()
    .sendedRequest()
    .receivedRequest();

  user.friendRequests.push(loginUser._id);
  await user.save();

  return res.json(new ApiResponse(200, {}, `Request sended to ${user.name}`));
});

//confirm request
export const confirmUserRequestController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const loginUser = await UserModel.findById(req.user._id);
  const user = await UserModel.findById(id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  let include = userIncludes(loginUser, user);

  await new UserRelation(include).self().friends().sendedRequest().noRelation();

  user.friends.push(loginUser._id);
  loginUser.friends.push(user._id);
  
  loginUser.friendRequests = loginUser.friendRequests.filter(
    (item) => item.toString() !== user._id.toString()
  );

  await loginUser.save();
  await user.save();

  return res.json(new ApiResponse(200, {}, "Request accepted"));
});

//reject request
export const rejectUserRequestController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const loginUser = await UserModel.findById(req.user._id);
  const user = await UserModel.findById(id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  let include = userIncludes(loginUser, user);

  await new UserRelation(include).self().friends().sendedRequest().noRelation();

  loginUser.friendRequests = loginUser.friendRequests.filter(
    (item) => item.toString() !== user._id.toString()
  );

  await loginUser.save();

  return res.json(new ApiResponse(200, {}, "Request rejected"));
});

//cancel request
export const cancelUserRequestController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const loginUser = await UserModel.findById(req.user._id);
  const user = await UserModel.findById(id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  let include = userIncludes(loginUser, user);

  await new UserRelation(include)
    .self()
    .friends()
    .receivedRequest()
    .noRelation();

  user.friendRequests = loginUser.friendRequests.filter(
    (item) => item.toString() !== loginUser._id.toString()
  );

  await user.save();

  return res.json(new ApiResponse(200, {}, "Request canceled"));
});

//unfriend user
export const unfriendUserController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const loginUser = await UserModel.findById(req.user._id);
  const user = await UserModel.findById(id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  let include = userIncludes(loginUser, user);

  await new UserRelation(include)
    .self()
    .sendedRequest()
    .receivedRequest()
    .noRelation();

  loginUser.friends = loginUser.friends.filter(
    (item) => item.toString() !== user._id.toString()
  );
  user.friends = user.friends.filter(
    (item) => item.toString() !== loginUser._id.toString()
  );

  await user.save();
  await loginUser.save();

  return res.json(new ApiResponse(200, {}, "Removed from friend list"));
});
