import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  createNewGroupChatController,
  findAndCreateChatController,
  findChatsOfUserController,
  findGroupsChatsOfUserController,
} from "../controllers/chatController.js";

const router = express.Router();

router.route("/chats").get(isAuthenticated, findChatsOfUserController);

router.route("/chat/:id").post(isAuthenticated, findAndCreateChatController);

router
  .route("/chats/groups")
  .get(isAuthenticated, findGroupsChatsOfUserController);

router
  .route("/group/create")
  .post(isAuthenticated, createNewGroupChatController);

export default router;
