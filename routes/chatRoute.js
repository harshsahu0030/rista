import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createNewGroupChatController } from "../controllers/chatController.js";

const router = express.Router();

router
  .route("/group/create")
  .post(isAuthenticated, createNewGroupChatController);

export default router;
