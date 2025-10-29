import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IChat {
  participants: mongoose.Types.ObjectId[];
  lastMessage: mongoose.Types.ObjectId;
  isGroup: boolean;
  groupName: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  chatId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content?: string;
  image?: string;
  replyTo?:  mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
