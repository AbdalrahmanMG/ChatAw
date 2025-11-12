import { API } from "@/lib/axios";
import type { UserType } from "@/types/authType";
import type {
  ChatType,
  CreateChatType,
  CreateMessageType,
  MessageType,
} from "@/types/chatTypes";
import { toast } from "sonner";
import { create } from "zustand";
import { useAuth } from "./useAuth";
import { generateUUID } from "@/utils/utils";

interface ChatState {
  chats: ChatType[];
  users: UserType[];
  singleChat: {
    chat: ChatType;
    messages: MessageType[];
  } | null;

  isChatsLoading: boolean;
  isUsersLoading: boolean;
  isCreatingChat: boolean;
  isSingleChatLoading: boolean;
  isSendingMsg: boolean;

  fetchAllUsers: () => void;
  fetchChats: () => void;
  createChat: (payload: CreateChatType) => Promise<ChatType | null>;
  fetchSingleChat: (chatId: string) => void;
  addNewChat: (payload: ChatType) => void;
  updateChatLastMessage: (chatId: string, lastmessage: MessageType) => void;
  addnewMessage: (chatId: string, message: MessageType) => void;
  sendMessage: (payload: CreateMessageType) => void;
}

export const useChat = create<ChatState>()((set, get) => ({
  chats: [],
  users: [],
  singleChat: null,
  isChatsLoading: false,
  isCreatingChat: false,
  isSingleChatLoading: false,
  isUsersLoading: false,
  isSendingMsg: false,

  fetchAllUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const { data } = await API.get("/user/all");
      set({ users: data.users });
    } catch (error: Error | unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to get users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  fetchChats: async () => {
    set({ isChatsLoading: true });
    try {
      const { data } = await API.get("/chat/all");
      set({ chats: data.chats });
    } catch (error: Error | unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to get chats");
    } finally {
      set({ isChatsLoading: false });
    }
  },

  createChat: async (payload: CreateChatType) => {
    set({ isCreatingChat: true });
    try {
      const { data } = await API.post("/chat/create", { ...payload });
      get().addNewChat(data.chat);
      toast.success("Chat created successfully");
      return data.chat;
    } catch (error: Error | unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to create chat");
      return null;
    } finally {
      set({ isCreatingChat: false });
    }
  },

  fetchSingleChat: async (userId: string) => {
    set({ isSingleChatLoading: true });
    try {
      const { data } = await API.get(`chat/${userId}`);
      set({ singleChat: data });
    } catch (error: Error | unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to get chat");
    } finally {
      set({ isSingleChatLoading: false });
    }
  },

  addNewChat: (newChat: ChatType) => {
    set((state) => {
      const existingChatIndex = state.chats.findIndex(
        (c) => c._id === newChat._id
      );

      if (existingChatIndex !== -1) {
        return {
          chats: [newChat, ...state.chats.filter((c) => c._id !== newChat._id)],
        };
      } else {
        return {
          chats: [newChat, ...state.chats],
        };
      }
    });
  },

  updateChatLastMessage: (chatId, lastMessage) => {
    set((state) => {
      const chat = state.chats.find((c) => c._id === chatId);
      if (!chat) return state;
      return {
        chats: [
          {
            ...chat,
            lastMessage,
          },
          ...state.chats.filter((c) => c._id !== chatId),
        ],
      };
    });
  },

  addnewMessage: (chatId, message) => {
    const singleChat = get().singleChat;
    if (singleChat?.chat._id === chatId) {
      set({
        singleChat: {
          chat: singleChat.chat,
          messages: [...singleChat.messages, message],
        },
      });
    }
  },

  sendMessage: async (data) => {
    set({ isSendingMsg: true });
    const { chatId, replyTo, content, image } = data;
    const { user } = useAuth.getState();

    if (!chatId || !user?._id) return;
    const tempMsgId = generateUUID();

    const tempMessage = {
      _id: tempMsgId,
      chatId,
      content: content || "",
      image: image || null,
      replyTo: replyTo || null,
      sender: user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "sending...",
    };

    set((state) => {
      if (!state.singleChat || state.singleChat.chat._id !== chatId) {
        return state;
      }

      return {
        singleChat: {
          ...state.singleChat,
          messages: [...state.singleChat.messages, tempMessage]
        },
      };
    });

    try {
      const { data } = await API.post("/chat/message/send", {
        chatId,
        content,
        image,
        replyToId: replyTo?._id,
      });
      const { userMessage } = data;

      set((state) => {
        if (!state.singleChat) return state;
        return {
          singleChat: {
            ...state.singleChat,
            messages: state.singleChat.messages.map((msg) =>
              msg._id === tempMsgId ? userMessage : msg
            ),
          },
        };
      });
    } catch (error: Error | unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to create chat");
    } finally {
      set({isSendingMsg: false})
    }
  },
}));
