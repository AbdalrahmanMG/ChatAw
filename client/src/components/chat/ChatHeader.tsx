import { PROTECTED_ROUTES } from "@/routes/routes";
import type { ChatType } from "@/types/chatTypes";
import { getOtherUsersAndGroup } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AvatarBadge from "../AvatarBadge";
import { useSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";

interface ChatHeaderProps {
  chat: ChatType;
  currentUserId: string | null;
}

const ChatHeader = ({ chat, currentUserId }: ChatHeaderProps) => {
  const { socket } = useSocket();
  const navigate = useNavigate();
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const { name, avatar, subheading, isOnline, isGroup } = getOtherUsersAndGroup(
    chat,
    currentUserId
  );

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
  .map(
    (id) =>
      chat?.participants.find((p) => p._id === id)?.name
  )  .filter(Boolean);

  const typingText =
  typingNames.length === 1
    ? `is typing...`
    : typingNames.length > 1
    ? "Several people are typing..."
    : "";

  return (
    <div className="sticky top-0 flex items-center gap-5 border-b border-border px-4 z-50 bg-muted/20 dark:bg-sidebar ">
      <div className="h-18 px-4 flex items-center">
        <div>
          <ArrowLeft
            className="w-5 h-5 inline-block lg:hidden
          text-muted-foreground cursor-pointer
          mr-2
          "
            onClick={() => navigate(PROTECTED_ROUTES.CHAT)}
          />
        </div>
        <AvatarBadge
          name={name}
          src={avatar}
          isGroup={isGroup}
          isOnline={isOnline}
          size="size-[40px]"
        />

        <div className="ml-2">
          <h5 className="font-semibold">{name}</h5>
          <p
            className={`text-sm ${
              isOnline ? "text-green-500" : "text-muted-foreground"
            }`}
          >
            {subheading}
          </p>
          {typingText && (
            <div className="text-sm text-muted-foreground">{typingText}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
