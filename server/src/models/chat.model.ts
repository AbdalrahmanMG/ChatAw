import mongoose, { Schema } from "mongoose";
import { IChat } from "../types";

const chatSchema = new Schema<IChat>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isGroup: { type: Boolean, default: false },
    groupName: { type: String },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model<IChat>("Chat", chatSchema);
export default chatModel;
