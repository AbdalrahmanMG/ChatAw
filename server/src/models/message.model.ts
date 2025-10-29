import mongoose, { Schema } from "mongoose";
import { IMessage } from "../types";

const messageSchema = new Schema<IMessage>({
  chatId: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  content: { type: String },
  image: { type: String },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  replyTo: {
    type: Schema.Types.ObjectId,
    ref: "Message",
    default: null,
  },

},{timestamps: true});

const messageModel = mongoose.model<IMessage>("Message", messageSchema)
export default messageModel
