import { memo } from "react";
import type { UserType } from "@/types/authType";
import { Checkbox } from "@/components/ui/checkbox";
import UserAvatar from "./UserAvatar";

interface GroupItemsProps {
  user: UserType;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const GroupUserItem = memo(
  ({
    user,
    isSelected,
    onToggle,
  }: GroupItemsProps) => (
    <label
      role="button"
      className="w-full flex items-center gap-2 p-2
      rounded-sm hover:bg-accent
       transition-colors text-left
      "
    >
      <UserAvatar user={user} />
      <Checkbox
        checked={isSelected}
        onCheckedChange={() => onToggle(user._id)}
      />
    </label>
  )
);

export default GroupUserItem