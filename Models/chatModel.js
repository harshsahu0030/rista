import mongoose, { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
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

    creator: {
      type: Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.models.Chat || model("Chat", schema);

export default ChatModel;
