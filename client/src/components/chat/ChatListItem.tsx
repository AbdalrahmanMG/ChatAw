import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { ChatType } from "@/types/chatTypes";
import { formatChatTime, getOtherUsersAndGroup } from "@/utils/utils";
import { useLocation } from "react-router-dom";
import AvatarBadge from "../AvatarBadge";

interface ChatListItemProps {
  chat: ChatType;
  onClick?: () => void;
}
const ChatListItem = ({ chat, onClick }: ChatListItemProps) => {
  const { pathname } = useLocation();
  const { lastMessage, createdAt } = chat;
  const { user } = useAuth();
  const currentUserId = user?._id || null;

  const { name, avatar, isOnline, isGroup } = getOtherUsersAndGroup(
    chat,
    currentUserId
  );

  const getLastMessageContent = () =>{
    if(!lastMessage) {
      return isGroup ?
      chat.createdBy === currentUserId 
      ? "Group created"
      : "You were added"
      :"Send a message!"
    }
    
    if(isGroup && lastMessage.sender) {
      return `${lastMessage.sender._id === currentUserId 
      ? "You"
      : lastMessage.sender.name
      }: ${lastMessage.content || "📷 Photo"}`
    }

    if(lastMessage.image) return "📷 Photo"

    return lastMessage.content
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        `w-full items-center gap-2 rounded-sm hover:bg-sidebar-accent 
      transition-colors text-left`,
        pathname.includes(chat._id) && "!bg-sidebar-accent"
      )}
    >
      <AvatarBadge
      name={name}
      src={avatar}
      isGroup={isGroup}
      isOnline={isOnline}
      />
      <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-0.5">
        <h5 className="text-sm font-semibold truncate">{name}</h5>
        <span className="text-xs ml-2 shrink-0 text-muted-foreground">
          {formatChatTime(lastMessage?.updatedAt || createdAt)}
        </span>
      </div>
      <p className="text-xs truncate text-muted-foreground">
        {getLastMessageContent()}
      </p>
      </div>
    </button>
  );
};

export default ChatListItem;
