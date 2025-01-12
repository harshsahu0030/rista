import OtpUserModel from "../Models/registerUserOtp.js";
import otpUserModel from "../Models/registerUserOtp.js";
import UserModel from "../Models/UserModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHanlder.js";
import { optGenerate } from "../utils/otpGenerate.js";
import { clearAuthToken, sendAuthToken } from "../utils/AuthToken.js";
import { sendMail } from "../utils/sendMail.js";
import crypto from "crypto";
import {
  singledeleteCloudinary,
  singleUploadCloudinary,
} from "../utils/cloudinary.js";

//--------------------------------------------------------------------------------
//register user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  const userExist = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (userExist) {
    throw new ApiError(404, "User already exist");
  }

  // email, subject, text
  const otpNumber = optGenerate();
  const subject = "Registration email Verification of Authentication.";
  const text = `Registration Email Verification for Authentication - ${otpNumber}. This is only valid for 30 minutes.`;

  //sending otp to email for verification
  await sendMail({
    email,
    subject,
    text,
  });

  // create register otp model for verification
  const otp = await otpUserModel.create({
    ...req.body,
    otp: otpNumber,
    expire: new Date(Date.now() + 30 * 60 * 1000),
  });

  if (!otp) {
    throw new ApiError(400, "Something went wrong");
  }

  const otpId = otp._id;

  return res.json(
    new ApiResponse(
      200,
      {
        otpId,
        email,
      },
      `Code sended to ${email}`
    )
  );
});

//--------------------------------------------------------------------------------
//registeration user verfication
export const registerUserVerificationController = asyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const { otp } = req.body;
    const otpModel = await OtpUserModel.findOne({ _id: id }).select(
      "+password"
    );

    if (!otpModel || parseInt(otpModel.expire) < Date.now()) {
      throw new ApiError(408, "Link expire. Please register again..");
    }

    if (!otp) {
      throw new ApiError(404, "please fill the OTP input");
    }

    if (parseInt(otpModel.otp) !== parseInt(otp)) {
      throw new ApiError(404, "Invalid OTP");
    }

    let user = await UserModel.findOne({ email: otpModel.email });

    if (user) {
      return next(new ErrorHandler("User already exist.. please login", 400));
    }

    user = await UserModel.create({
      username: otpModel.username,
      name: otpModel.name,
      email: otpModel.email,
      password: otpModel.password,
      birthday: otpModel.birthday,
    });

    // email, subject, text
    const subject = "Thank your for registering on Authenticaton";
    const text = `Thank your ${otpModel.name} for registering on Authenticaton`;

    //sending email
    await sendMail({ email: otpModel.email, subject, text });

    await OtpUserModel.deleteMany({
      $or: [{ email: otpModel.email }, { username: otpModel.username }],
    });

    sendAuthToken(res, user, 200, `Welcome, ${user.name}`);
  }
);

//-----------------------------------------------------------------------------
//resend register user verification otp
export const getRegisterOtpDetailController = asyncHandler(async (req, res) => {
  const otpModel = await otpUserModel.findById(req.params.id);

  if (!otpModel || parseInt(otpModel.expire) < Date.now()) {
    throw new ApiError(408, "Link expire. Please register again..");
  }

  return res.json(
    new ApiResponse(200, {
      username: otpModel.username,
      email: otpModel.email,
    })
  );
});
//-----------------------------------------------------------------------------
//resend register user verification otp
export const resendRegisterUserVerificationOtpController = asyncHandler(
  async (req, res) => {
    const otpModel = await otpUserModel.findById(req.params.id);

    if (!otpModel) {
      return next(
        new ErrorHandler("Request Error! please register again", 400)
      );
    }

    if (!otpModel || parseInt(otpModel.expire) < Date.now()) {
      throw new ApiError(408, "Link expire. Please register again..");
    }

    const otpNumber = optGenerate();
    otpModel.otp = otpNumber;
    await otpModel.save();

    // email, subject, text
    const subject = "Registration email Verification of Authentication.";
    const text = `Registration Email Verification for Authentication - ${otpModel.otp}. This is only valid for 30 minutes.`;

    //sending email
    await sendMail({ email: otpModel.email, subject, text });

    return res.json(
      new ApiResponse(200, null, `Code sended to ${otpModel.email}`)
    );
  }
);

//-----------------------------------------------------------------------------
//login user
export const loginUserController = asyncHandler(async (req, res) => {
  const { input, password } = req.body;

  const user = await UserModel.findOne({
    $or: [{ email: input }, { username: input }],
  }).select("+password");

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  sendAuthToken(res, user, 200, `Welcome Back, ${user.name}`);
});

//-----------------------------------------------------------------------------
//load user
export const loadUserController = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id , "name , username , email , avatar , coverImage , ");

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  return res.json(new ApiResponse(200, user, `welcome back! ${user.username}`));
});

//-----------------------------------------------------------------------------
//logout user
export const logoutUserController = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  clearAuthToken(res, 200, `See you Again! ${user.name}`);
});

//-----------------------------------------------------------------------------
//update user password
export const updateUserPasswordController = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id).select("+password");

  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid old password");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(404, "new and confirm password don't match");
  }

  user.password = newPassword;
  await user.save();

  clearAuthToken(res, 200, `Password has been updated! Please login again.`);

});

//-----------------------------------------------------------------------------
//update user profile
export const updateUserProfileController = asyncHandler(async (req, res) => {
  let { avatar, coverImage } = req.body;
  let user = await UserModel.findById(req.user._id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  if (avatar) {
    req.body.avatar = await singleUploadCloudinary(avatar);
    if (user?.avatar?.public_id) {
      await singledeleteCloudinary(user?.avatar?.public_id);
    }
  }

  if (coverImage) {
    req.body.coverImage = await singleUploadCloudinary(coverImage);
    if (user?.avatar?.public_id) {
      await singledeleteCloudinary(user?.coverImage?.public_id);
    }
  }

  await UserModel.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.json(new ApiResponse(200, null, `profile updated`));
});

//-----------------------------------------------------------------------------
//forgot user password
export const forgotUserPasswordController = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email }).select(
    "+resetPasswordToken +resetPasswordExpire"
  );

  if (!user) {
    throw new ApiError(400, "User not found with this email");
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.save();

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/about/reset-password/${resetToken}`;

  // email, subject, text
  const subject = "Forgot password of Authentication.";
  const text = `Forgot password of Authentication. This link is only valid for 30 minutes. - ${resetPasswordUrl}`;

  //sending otp to email for verification
  await sendMail({
    email,
    subject,
    text,
  });

  return res.json(new ApiResponse(200, null, `Code sended to ${user.email}`));
});

//reset user password
export const resetUserPasswordController = asyncHandler(async (req, res) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    throw new ApiError(
      400,
      "Reset Password Token is invalid or has been expired"
    );
  }

  const { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "new and confirm password don't match");
  }

  user.password = req.body.newPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  await user.save();

  // email, subject, text
  const subject = "Password Updated of Rista.";
  const text = `Password Updated of Rista. Now you can login with new password.`;

  //sending otp to email for verification
  await sendMail({
    email: user.email,
    subject,
    text,
  });

  clearAuthToken(res, 200, `Password has been reset. Please login`);
});
