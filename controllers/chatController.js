import {
  ALERT,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constant/events.js";
import ChatModel from "../Models/chatModel.js";
import MessageModel from "../Models/messageModel.js";
import UserModel from "../Models/UserModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHanlder.js";
import { singleUploadCloudinary } from "../utils/cloudinary.js";
import { emitEvent } from "../utils/socketHelpers.js";

//find all chats of user
export const findChatsOfUserController = asyncHandler(async (req, res) => {
  let chats = await ChatModel.find({
    $and: [{ groupChat: false }, { members: { $in: [req.user._id] } }],
  });

  res.json(new ApiResponse(200, chats, ""));
});

//find all group chats of user
export const findGroupsChatsOfUserController = asyncHandler(
  async (req, res) => {
    let chats = await ChatModel.find({
      $and: [{ groupChat: true }, { members: { $in: [req.user._id] } }],
    });

    res.json(new ApiResponse(200, chats, ""));
  }
);

//send message or create chat and send send message
export const findAndCreateChatController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  let chat = await ChatModel.findById(id);

  if (chat) {
    const messageObj = {
      content,
      sender: user._id,
      chat: chat._id,
    };

    const message = await MessageModel.create(messageObj);
    chat.messages.push(message._id);
  } else {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    chat = await ChatModel.findOne({
      $and: [{ groupChat: false }, { members: { $in: [id, req.user._id] } }],
    });

    if (chat) {
      const messageObj = {
        content,
        sender: user._id,
        chat: chat._id,
      };

      const message = await MessageModel.create(messageObj);
      chat.messages.push(message._id);
    } else {
      chat = await ChatModel.create({
        name: "sender",
        groupChat: false,
        creator: req.user,
        members: [id, req.user._id],
      });

      const messageObj = {
        content,
        sender: user._id,
        chat: chat._id,
      };

      const message = await MessageModel.create(messageObj);
      chat.messages.push(message._id);
    }
  }

  await chat.save();

  emitEvent(req, NEW_MESSAGE, chat.members, {
    message: messageForRealTime,
    chatId: chat._id,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId: chat._id });

  res.json(new ApiResponse(200, {}, "Message sended"));
});

//create new group chat
export const createNewGroupChatController = asyncHandler(async (req, res) => {
  const { name, members, avatar, coverImage } = req.body;

  if (!name) {
    throw new ApiError(400, "Name is required");
  }

  if (members.includes(req.user._id.toString())) {
    throw new ApiError(400, "You can't add yourself to the group");
  }

  if (members.length < 2) {
    throw new ApiError(400, "You need to add at least 2 members");
  }

  const allMembers = [...members, req.user];

  if (avatar) {
    req.body.avatar = await singleUploadCloudinary(avatar);
  }

  if (coverImage) {
    req.body.coverImage = await singleUploadCloudinary(coverImage);
  }

  await ChatModel.create({
    name,
    groupChat: true,
    creator: req.user,
    avatar: req.body.avatar,
    coverImage: req.body.coverImage,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
  emitEvent(req, REFETCH_CHATS, members);

  return res.json(new ApiResponse(200, {}, "Group created"));
});

// send message group chat
export const sendMessageGroupChatController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const chat = await ChatModel.find({
    $and: [{ groupChat: true }, { _id: id }],
  });

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  const messageObj = {
    content,
    sender: user._id,
    chat: chat._id,
  };

  const message = await MessageModel.create(messageObj);
  chat.messages.push(message._id);

  return res.json(new ApiResponse(200, {}, "Message sended"));
});
