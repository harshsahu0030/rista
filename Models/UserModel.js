import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = mongoose.Schema(
  {
    name: {
      type: "String",
      required: true,
      minLength: [3, "Name must be at least 3  characters"],
    },

    username: {
      type: "String",
      required: true,
      unique: true,
      minLength: [3, "Username must be at least 3 characters"],
    },

    email: { type: "String", unique: true, required: true },

    bio: { type: "String" },

    password: {
      type: "String",
      required: true,
      select: false,
      minLength: [3, "Username must be at least 8 characters"],
    },

    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    coverImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    birthday: {
      type: Date,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    friendRequests: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    sendRequests: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],

    chats: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Chat",
      },
    ],

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

// save password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

const UserModel = mongoose.models.User || model("User", userSchema);

export default UserModel;
