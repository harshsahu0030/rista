import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  getUserController,
  getUsersController,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/users").get(isAuthenticated, getUsersController);

router.route("/users/:id").get(isAuthenticated, getUserController);

export default router;
