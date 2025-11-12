import { cn } from "@/lib/utils";
import type { ChatType } from "@/types/chatTypes";
import { formatChatTime, getOtherUsersAndGroup } from "@/utils/utils";
import { useLocation } from "react-router-dom";
import AvatarBadge from "../AvatarBadge";
import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";

interface ChatListItemProps {
  chat: ChatType;
  onClick?: () => void;
  currentUserId: string | null;
}
const ChatListItem = ({ chat, onClick, currentUserId }: ChatListItemProps) => {
  const { pathname } = useLocation();
  const { lastMessage, createdAt } = chat;
  const { socket } = useSocket();
  const { name, avatar, isOnline, isGroup } = getOtherUsersAndGroup(
    chat,
    currentUserId
  );
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleTyping = ({
      userId,
      chatId,
    }: {
      userId: string;
      chatId: string;
    }) => {
      if (chatId !== chat._id || userId === currentUserId) return;
      setTypingUsers((prev) =>
        prev.includes(userId) ? prev : [...prev, userId]
      );
    };

    const handleStopTyping = ({
      userId,
      chatId,
    }: {
      userId: string;
      chatId: string;
    }) => {
      if (chatId !== chat._id) return;
      setTypingUsers((prev) => prev.filter((id) => id !== userId));
    };

    socket.on("chat:typing", handleTyping);
    socket.on("chat:stopTyping", handleStopTyping);

    return () => {
      socket.off("chat:typing", handleTyping);
      socket.off("chat:stopTyping", handleStopTyping);
    };
  }, [socket, chat._id, currentUserId]);

  const typingNames = typingUsers
    .map((id) => chat?.participants.find((p) => p._id === id)?.name)
    .filter(Boolean);

  const typingText =
    typingNames.length === 1
      ? `is typing...`
      : typingNames.length > 1
      ? "Several people are typing..."
      : "";

  const getLastMessageContent = () => {
    if (!lastMessage) {
      return isGroup
        ? chat.createdBy === currentUserId
          ? "Group created"
          : "You were added"
        : "Send a message!";
    }

    if (isGroup && lastMessage.sender) {
      return `${
        lastMessage.sender._id === currentUserId
          ? "You"
          : lastMessage.sender.name
      }: ${lastMessage.content || "📷 Photo"}`;
    }

    if (lastMessage.image) return "📷 Photo";

    return lastMessage.content;
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
     hover:bg-muted/40 transition-colors duration-150 text-left`,
        pathname.includes(chat._id) && "bg-primary/8 dark:bg-primary/20"
      )}
    >
      <AvatarBadge
        name={name}
        src={avatar}
        isGroup={isGroup}
        isOnline={isOnline}
        size="size-[40px]"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h5 className="text-sm font-semibold truncate">{name}</h5>
          <span className="text-[11px] text-muted-foreground shrink-0 ml-2">
            {formatChatTime(lastMessage?.updatedAt || createdAt)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {typingText ? typingText : getLastMessageContent()}
        </p>
      </div>
    </button>
  );
};

export default ChatListItem;
