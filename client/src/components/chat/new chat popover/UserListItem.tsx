import { Spinner } from "@/components/ui/spinner";
import type { UserType } from "@/types/authType";
import { memo } from "react";
import UserAvatar from "./UserAvatar";

interface ChatItemsProps {
  user: UserType;
  isLoading: boolean;
  disabled: boolean;
  onClick: (id: string) => void;
}

const ChatUserItem = memo(
  ({
    user,
    isLoading,
    disabled,
    onClick,
  }: ChatItemsProps) => (
    <button
      className="
      relative w-full flex items-center gap-2 p-2
    rounded-sm hover:bg-accent
       transition-colors text-left disabled:opacity-50"
      disabled={isLoading || disabled}
      onClick={() => onClick(user._id)}
    >
      <UserAvatar user={user} />
      {isLoading && <Spinner className="absolute right-2 w-4 h-4 ml-auto" />}
    </button>
  )
);

export default ChatUserItem
