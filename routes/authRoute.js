import express from "express";
import {
  forgotUserPasswordController,
  getRegisterOtpDetailController,
  loadUserController,
  loginUserController,
  logoutUserController,
  registerUser,
  registerUserVerificationController,
  resendRegisterUserVerificationOtpController,
  resetUserPasswordController,
  updateUserPasswordController,
  updateUserProfileController,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  changePasswordValidator,
  forgotPasswordValidator,
  loginValidator,
  registerValidator,
  resetPasswordValidator,
  validateHandler,
} from "../lib/validators.js";

const router = express.Router();

router
  .route("/register")
  .post(registerValidator(), validateHandler, registerUser);

router.route("/register/:id").post(registerUserVerificationController);

router.route("/register/info/:id").get(getRegisterOtpDetailController);

router
  .route("/register/resend/:id")
  .get(resendRegisterUserVerificationOtpController);

router
  .route("/login")
  .post(loginValidator(), validateHandler, loginUserController);

router.route("/load").get(isAuthenticated, loadUserController);

router.route("/logout").get(isAuthenticated, logoutUserController);

router
  .route("/update/profile")
  .put(isAuthenticated, updateUserProfileController);

router
  .route("/update/password")
  .put(
    isAuthenticated,
    changePasswordValidator(),
    validateHandler,
    updateUserPasswordController
  );

router
  .route("/password/forgot")
  .post(
    forgotPasswordValidator(),
    validateHandler,
    forgotUserPasswordController
  );

router
  .route("/password/reset/:token")
  .put(resetPasswordValidator(), validateHandler, resetUserPasswordController);

// Admin Routes
//   router.route("/admin")
//   .put(isAuthenticated, authorizeRoles("admin"), Admin route);

export default router;
