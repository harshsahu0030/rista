import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  cancelUserRequestController,
  confirmUserRequestController,
  getFriendsUsersController,
  getUserController,
  getUserRelationController,
  getUsersController,
  getUsersRequestController,
  getUsersRequestSendController,
  rejectUserRequestController,
  sendUserRequestController,
  unfriendUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/users").get(isAuthenticated, getUsersController);

router.route("/users/friends").get(isAuthenticated, getFriendsUsersController);

router.route("/users/requests").get(isAuthenticated, getUsersRequestController);


router
  .route("/users/requestssend")
  .get(isAuthenticated, getUsersRequestSendController);

router.route("/users/:id").get(isAuthenticated, getUserController);

router
  .route("/users/relation/:id")
  .get(isAuthenticated, getUserRelationController);

router.route("/users/send/:id").get(isAuthenticated, sendUserRequestController);

router
  .route("/users/confirm/:id")
  .get(isAuthenticated, confirmUserRequestController);

router
  .route("/users/reject/:id")
  .get(isAuthenticated, rejectUserRequestController);

router
  .route("/users/cancel/:id")
  .get(isAuthenticated, cancelUserRequestController);

router
  .route("/users/unfriend/:id")
  .get(isAuthenticated, unfriendUserController);

export default router;
