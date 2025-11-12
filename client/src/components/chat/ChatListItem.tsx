import { cn } from "@/lib/utils";
import type { ChatType } from "@/types/chatTypes";
import { formatChatTime, getOtherUsersAndGroup } from "@/utils/utils";
import { useLocation } from "react-router-dom";
import AvatarBadge from "../AvatarBadge";

interface ChatListItemProps {
  chat: ChatType;
  onClick?: () => void;
  currentUserId: string | null;
}
const ChatListItem = ({ chat, onClick, currentUserId }: ChatListItemProps) => {
  const { pathname } = useLocation();
  const { lastMessage, createdAt } = chat;

  const { name, avatar, isOnline, isGroup } = getOtherUsersAndGroup(
    chat,
    currentUserId
  );

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
          {getLastMessageContent()}
        </p>
      </div>
    </button>
  );
};

export default ChatListItem;
