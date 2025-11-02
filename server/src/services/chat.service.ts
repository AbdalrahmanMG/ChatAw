import chatModel from "../models/chat.model";
import messageModel from "../models/message.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import { findByIdUserService } from "./user.service";

export const createChatService = async (
  userId: string,
  body: {
    participants: (string | undefined)[];
    groupName?: string;
    isGroup?: boolean;
    participantId?: string;
  }
) => {
  const { participants, groupName, isGroup, participantId } = body;

  let chat;
  let allParticipantsIds: string[] = [];

  if (isGroup && participants.length > 1 && groupName) {
    allParticipantsIds = [
      userId,
      ...participants.filter((p): p is string => !!p),
    ]; //check this later
    chat = await chatModel.create({
      participants: allParticipantsIds,
      isGroup: true,
      groupName,
      createdBy: userId,
    });
  } else if (participantId) {
    const otherParticipant = await findByIdUserService(participantId);
    if (!otherParticipant) throw new NotFoundException("User not found");

    allParticipantsIds = [userId, participantId];
    const existingChat = await chatModel
      .findOne({
        participants: {
          $all: allParticipantsIds,
          $size: 2,
        },
      })
      .populate("participants", "name avatar");

    if (existingChat) return existingChat;

    chat = await chatModel.create({
      participants: allParticipantsIds,
      isGroup: false,
      createdBy: userId,
    });
  }
  return chat;
};

export const getUserChatsService = async (userId: string) => {
  const chats = await chatModel
    .find({
      participants: {
        $in: [userId],
      },
    })
    .populate("participants", "name avatar")
    .populate({
      path: "lastMessage",
      populate: {
        path: "sender",
        select: "name avatar",
      },
    })
    .sort({ updatedAt: -1 });
  return chats;
};

export const getSingleChatService = async (chatId: string, userId: string) => {
  const chat = await chatModel.findOne({
    _id: chatId,
    participants: {
      $in: [userId],
    },
  });

  if (!chat)
    throw new BadRequestException(
      "Chat not found or you are not authorized to view this chat"
    );

  const messages = await messageModel
    .find({ chatId })
    .populate("sender", "name avatar")
    .populate({
      path: "replyTo",
      select: "content image sender",
      populate: {
        path: "sender",
        select: "name avatar",
      },
    })
    .sort({ createdAt: 1 });

  return {
    chat,
    messages,
  };
};
