import ChatBody from "@/components/chat/ChatBody";
import ChatFooter from "@/components/chat/ChatFooter";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatPlaceholder from "@/components/chat/ChatPlaceholder";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import useChatId from "@/hooks/useChatId";
import { useSocket } from "@/hooks/useSocket";
import type { MessageType } from "@/types/chatTypes";
import { useEffect, useState } from "react";

const SingleChat = () => {
  const chatId = useChatId();
  const { user } = useAuth();
  const { fetchSingleChat, isSingleChatLoading, singleChat } = useChat();
  const { socket } = useSocket();

  const [replyTo, setReplyTo] = useState<MessageType | null>(null);

  const currentUserId = user?._id || null;
  const chat = singleChat?.chat;
  const messages = singleChat?.messages;

  //get chat messages
  useEffect(() => {
    if (!chatId) return;
    fetchSingleChat(chatId);
  }, [chatId, fetchSingleChat]);

  // joint a chat
  useEffect(() => {
    if (!chatId || !socket) return;
    socket.emit("chat:join", chatId);
    return () => {
      socket.emit("chat:leave", chatId);
    };
  }, [chatId, socket]);

  // ui fallback
  if (isSingleChatLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner className="w-11 h-11" />
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-lg">Chat not found</p>
      </div>
    );
  }

  return (
    <div className="relative h-svh flex flex-col">
      <ChatHeader chat={chat} currentUserId={currentUserId} />
      <div className="flex-1 overflow-y-auto ">
        {!messages || messages?.length === 0 ? (
          <ChatPlaceholder
            title="Start a conversation"
            description="No Messages yet! send the first one"
          />
        ) : (
          <ChatBody chatId={chatId} messages={messages} onReply={setReplyTo} />
        )}
      </div>

      <ChatFooter
        replyTo={replyTo}
        chatId={chatId}
        currentUserId={currentUserId}
        onCancelReply={() => setReplyTo(null)}
      />
    </div>
  );
};

export default SingleChat;
