import mongoose, { model } from "mongoose";

const registerOtpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      requred: true,
    },
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    birthday: {
      type: Date,
      required: true,
    },
    expire: {
      type: Date,
    },
  },
  { timestamps: true }
);

const OtpUserModel = mongoose.models.OTP || model("OTP", registerOtpSchema);


export default OtpUserModel;
