import { ALERT, REFETCH_CHATS } from "../constant/events.js";
import ChatModel from "../Models/chatModel.js";
import UserModel from "../Models/UserModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHanlder.js";
import { emitEvent } from "../utils/socketHelpers.js";

//find and create new chat
export const findAndCreateChatController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const user = await UserModel.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const chat = await ChatModel.find({
    $and: [{ groupChat: false }, { user: { $in: [id, req.user._id] } }],
  });

  if (chat) {
    return res.json(new ApiResponse(200, { chat }, ""));
  } else {
    await ChatModel.create({
      name: "sender",
      groupChat: false,
      creator: req.user,
      members: [id, req.user._id],
    });
  }
});

//create chat
export const createNewGroupChatController = asyncHandler(async (req, res) => {
  const { name, members } = req.body;

  if (members.includes(req.user._id.toString())) {
    throw new ApiError(400, "You can't add yourself to the group");
  }

  if (members.length < 2) {
    throw new ApiError(400, "You need to add at least 2 members");
  }

  const allMembers = [...members, req.user];

  await ChatModel.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
  emitEvent(req, REFETCH_CHATS, members);

  return res.json(new ApiResponse(200, {}, "Group created"));
});
