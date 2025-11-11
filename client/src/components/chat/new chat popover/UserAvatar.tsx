import AvatarBadge from "@/components/AvatarBadge";
import type { UserType } from "@/types/authType";
import { memo } from "react";

const UserAvatar = memo(({ user }: { user: UserType }) => (
  <>
    <AvatarBadge name={user.name} src={user.avatar ?? ""} />
    <div className="flex-1 min-w-0">
      <h5 className="text-[13.5px] font-medium truncate">{user.name}</h5>
      <p className="text-xs text-muted-foreground">Hey there! I'm using whop</p>
    </div>
  </>
));

export default UserAvatar
