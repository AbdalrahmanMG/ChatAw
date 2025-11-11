import { useChat } from "@/hooks/useChat";
import { useSocket } from "@/hooks/useSocket";
import type { MessageType } from "@/types/chatTypes";
import { useEffect, useRef } from "react";
import ChatBodyMessage from "./ChatBodyMessage";

interface ChatBodyProps {
  chatId: string | null;
  messages: MessageType[];
  onReply: (message: MessageType) => void;
}
const ChatBody = ({ chatId, messages, onReply }: ChatBodyProps) => {
  const { socket } = useSocket();
  const { addnewMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (msg: MessageType) => {
      if (chatId) addnewMessage(chatId, msg);
    };
    socket.on("message:new", handleNewMessage);
    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [socket, addnewMessage, chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="overflow-hidden">
      <div className="h-auto max-h-screen overflow-y-auto">
        <div className="w-full max-w-6xl mx-auto h-full flex flex-col px-3 pt-36">
          {messages.map((message) => (
            <ChatBodyMessage
              key={message._id}
              message={message}
              onReply={onReply}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
