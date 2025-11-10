import { API } from "@/lib/axios";
import type { UserType } from "@/types/authType";
import type { ChatType, CreateChatType, MessageType } from "@/types/chatTypes";
import { toast } from "sonner";
import { create } from "zustand";

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

  fetchAllUsers: () => void;
  fetchChats: () => void;
  createChat: (payload: CreateChatType) => Promise<ChatType | null>;
  fetchSingleChat: (chatId: string) => void;
  addNewChat: (payload: ChatType) => void;
}

export const useChat = create<ChatState>()((set, get) => ({
  chats: [],
  users: [],
  singleChat: null,
  isChatsLoading: false,
  isCreatingChat: false,
  isSingleChatLoading: false,
  isUsersLoading: false,

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
      const {data} = await API.post("/chat/create", { ...payload });
      get().addNewChat(data.chat)
      toast.success("Chat created successfully");
      return data.chat
    } catch (error: Error | unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to create chat");
      return null
    } finally {
      set({ isCreatingChat: false });
    }
  },

  fetchSingleChat: () => {
    set({ isSingleChatLoading: true });
  },

  addNewChat: (newChat: ChatType) => {
    set((state) => {
      const existingChatIndex = state.chats.findIndex(
        (c) => c._id === newChat._id
      );

      if( existingChatIndex !== -1) {
        return {
          chats: [newChat, ...state.chats.filter(c=> c._id !== newChat._id)]
        }
      } else {
        return {
          chats: [newChat, ...state.chats]
        }
      }
    });
  },
}));
