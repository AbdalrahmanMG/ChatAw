import type { UserType } from "./authType";

export type MessageType = {
  _id: string;
  content: string | null;
  image: string | null;
  sender: UserType | null;
  replyTo: MessageType | null;
  chatId: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
};

export type ChatType = {
  _id: string;
  lastMessage: MessageType;
  participants: UserType[];
  isGroup: boolean;
  createdBy: string;
  groupName?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateMessageType = {
  chatId: string;
  content?: string;
  image?: string;
  replyTo?: MessageType | null;
};
