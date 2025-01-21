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

  const loginUser = await UserModel.findById(req.user._id);
  const user = await UserModel.findById(id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  console.log(loginUser._id, user._id);

  let status = "noRelation";

  if (loginUser._id === user._id) {
    status = "self";
  } else if (user.friends.includes(loginUser._id)) {
    status = "friends";
  } else if (user.friendRequests.includes(loginUser._id)) {
    status = "sendedRequest";
  } else if (loginUser.friendRequests.includes(user._id)) {
    status = "receivedRequest";
  }

  return res.json(new ApiResponse(200, { user, status }, null));
});

//send request
export const sendUserRequestController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const loginUser = await UserModel.findById(req.user._id);
  const user = await UserModel.findById(id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  let sendedRequest = false;
  let recievedRequest = false;

  if (user.friends.includes(loginUser._id)) {
    throw new ApiError(400, "You are already friends");
  } else if (user.sentRequest.includes(loginUser._id)) {
    recievedRequest = true;
  } else if (loginUser.sentRequest.includes(user._id)) {
    sendedRequest = true;
  } else {
    user.sentRequest.push(loginUser._id);
  }
});
