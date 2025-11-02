import chatModel from "../models/chat.model";
import { NotFoundException } from "../utils/appError";
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
    allParticipantsIds = [userId, ...participants.filter((p): p is string => !!p)]; //check this later
    chat = await chatModel.create({
      participants: allParticipantsIds,
      isGroup: true,
      groupName,
      createdBy: userId,
    });
  } else if (participantId) {
    const otherParticipant = await findByIdUserService(participantId);
    if (!otherParticipant) throw new NotFoundException("User not found");

    allParticipantsIds = [userId, participantId]
    const existingChat = await chatModel.findOne({
      participants: {
        $all: allParticipantsIds,
        $size: 2
      },
    }).populate("participants", "name avatar")

    if(existingChat) return existingChat

    chat = await chatModel.create({
      participants: allParticipantsIds,
      isGroup: false,
      createdBy: userId,
    })

    return chat
  }
};
