import { useChat } from "@/hooks/useChat";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import ChatListItem from "./ChatListItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ChatListHeader from "./ChatListHeader";
import { useSocket } from "@/hooks/useSocket";
import type { ChatType, MessageType } from "@/types/chatTypes";

const ChatList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { socket } = useSocket();
  const {
    fetchChats,
    chats,
    isChatsLoading,
    addNewChat,
    updateChatLastMessage,
  } = useChat();
  const currentUserId = user?._id || null;
  const [searchQuery, setSearchQuery] = useState("");

  const filterChats = chats?.filter(
    (chat) =>
      chat.groupName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.participants?.some(
        (p) =>
          p._id !== currentUserId &&
          p.name?.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      []
  );
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  useEffect(() => {
    if (!socket) return;

    const handleNewChat = (newChat: ChatType) => {
      addNewChat(newChat);
    };
    socket.on("chat:new", handleNewChat);
    return () => {
      socket.off("chat:new", handleNewChat);
    };
  }, [addNewChat, socket]);

  useEffect(() => {
    if (!socket) return;

    const handleChatUpdate = (data: {
      chatId: string;
      lastMessage: MessageType;
    }) => {
      updateChatLastMessage(data.chatId, data.lastMessage);
    };

    socket.on("chat:update", handleChatUpdate);
    return () => {
      socket.off("chat:update", handleChatUpdate);
    };
  }, [socket, updateChatLastMessage]);

  const onRoute = (id: string) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="fixed inset-y-0 z-40 lg:pt-5 lg:max-w-[380px] w-full border-r border-border bg-muted/20 dark:bg-sidebar flex flex-col left-17    ">
      {/* Header */}
      <ChatListHeader onSearch={setSearchQuery} />

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-3 pt-2 pb-4 space-y-1">
        {isChatsLoading ? (
          <div className="flex items-center justify-center py-10">
            <Spinner />
          </div>
        ) : filterChats?.length === 0 ? (
          <div className="flex items-center justify-center text-sm text-muted-foreground py-10">
            {searchQuery ? "No chat found" : "No chats created"}
          </div>
        ) : (
          filterChats.map((chat) => (
            <ChatListItem
              key={chat._id}
              currentUserId={currentUserId}
              chat={chat}
              onClick={() => onRoute(chat._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
