import cloudinary from "../config/cloudinary.config";
import chatModel from "../models/chat.model";
import messageModel from "../models/message.model";
import { BadRequestException, NotFoundException } from "../utils/appError";

export const sendMessageService = async (
  userId: string,
  body: {
    chatId: string;
    content?: string;
    image?: string;
    replyTo?: string;
  }
) => {
  const { chatId, content, image, replyTo: replyToId } = body;

  const chat = await chatModel.findOne({
    _id: chatId,
    participants: {
      $in: [userId],
    },
  });

  if (!chat) throw new BadRequestException("Chat not found or unauthorized");

  if (replyToId) {
    const replyMessage = await messageModel.findOne({
      _id: replyToId,
      chatId,
    });
    if (!replyMessage) throw new NotFoundException("Reply Message not found");
  }
  let imageUrl;

  if (image) {
    const uploadRes = await cloudinary.uploader.upload(image);
    imageUrl = uploadRes.secure_url;
  }

  const newMessage = await messageModel.create({
    chatId,
    sender: userId,
    content,
    image: imageUrl,
    replyTo: replyToId || null,
  });

  await newMessage.populate([
    { path: "sender", select: "name avatar" },
    {
      path: "replyTo",
      select: "content image sender",
      populate: {
        path: "sender",
        select: "name avatar",
      },
    },
  ]);

  return { userMessage: newMessage, chat };
};
