import { body, param, validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ApiError(400, errorMessages));
};

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("email", "Please Enter Email").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
  body("birthday", "Please Enter Birthday").notEmpty(),
];

const loginValidator = () => [
  body("input", "Please Enter Email or Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const forgotPasswordValidator = () => [
  body("email", "Please Enter Email").notEmpty(),
];

const resetPasswordValidator = () => [
  body("newPassword", "Please Enter New Password").notEmpty(),
  body("confirmPassword", "Please Enter Confirm Password").notEmpty(),
];

const changePasswordValidator = () => [
  body("oldPassword", "Please Enter Old Password").notEmpty(),
  body("newPassword", "Please Enter New Password").notEmpty(),
  body("confirmPassword", "Please Enter Confirm Password").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

const addMemberValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];

const removeMemberValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
  body("userId", "Please Enter User ID").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
];

const chatIdValidator = () => [param("id", "Please Enter Chat ID").notEmpty()];

const renameValidator = () => [
  param("id", "Please Enter Chat ID").notEmpty(),
  body("name", "Please Enter New Name").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please Enter User ID").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Please Enter Request ID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please Add Accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];

const adminLoginValidator = () => [
  body("secretKey", "Please Enter Secret Key").notEmpty(),
];

export {
  acceptRequestValidator,
  addMemberValidator,
  adminLoginValidator,
  chatIdValidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  sendRequestValidator,
  validateHandler,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
};
