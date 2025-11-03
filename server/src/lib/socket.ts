import { Server as HTTPServer } from "http";
import { Server, type Socket } from "socket.io";
import { Env } from "../config/env.config";
import jwt from "jsonwebtoken";
import { validateChatParticipant } from "../services/chat.service";

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

let io: Server | null = null;

const onlineUsers = new Map<string, string>();

export const initializeSocket = (httpServer: HTTPServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: Env.FRONTEND_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // check authenticatoin 
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const rawCookie = socket.handshake.headers.cookie;
      if (!rawCookie) return next(new Error("Unauthorized"));

      const token = rawCookie?.split("=")?.[1]?.trim();
      if (!token) return next(new Error("Unauthorized"));

      const decodedToken = jwt.verify(token, Env.JWT_SECRET) as {
        userId: string;
      };

      if (!decodedToken) return next(new Error("Unauthorized"));

      socket.userId = decodedToken.userId;
      next();
    } catch (error) {
      next(new Error("Internal server Error"));
    }
  });

  io.use(async (socket: AuthenticatedSocket, next) => {
    if (!socket.userId) {
      socket.disconnect(true);
      return;
    }
    const userId = socket.userId;
    const newSocketId = socket.id;

    console.log("socket connected", { userId, newSocketId });

    onlineUsers.set(userId, newSocketId);

    io?.emit("online:users", Array.from(onlineUsers.keys()));

    //create personnal room
    socket.join(`user:${userId}`);
    socket.on(
      "chat:join",
      async (chatId: string, callback?: (err?: string) => void) => {
        try {
          validateChatParticipant(chatId, userId);
          socket.join(`chat:${chatId}`);
          callback?.();
        } catch (error) {
          callback?.("Error joinning chat");
        }
      }
    );

    socket.on("chat:leave", (chatId: string) => {
      if (chatId) {
        socket.leave(`chat:${chatId}`);
        console.log(`User ${userId} left room chat:${chatId}`);
      }
    });

    socket.on("disconnect", () => {
      if (onlineUsers.get(userId) === newSocketId) {
        if (userId) onlineUsers.delete(userId);

        io?.emit("online:users", Array.from(onlineUsers.keys()));

        console.log('socket disconnected', {
          userId, newSocketId
        })
      }
    });
  });
};
