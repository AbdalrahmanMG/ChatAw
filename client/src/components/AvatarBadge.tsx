import groupImg from "@/assets/group-img.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { avatarFallback } from "@/utils/utils";
interface AvatarProps {
  name: string;
  src: string | null;
  size?: string;
  isOnline?: boolean;
  isGroup?: boolean;
  classname?: string
}
const AvatarBadge = ({
  name,
  src,
  size,
  isOnline,
  classname,
  isGroup = false,
}: AvatarProps) => {
  const avatar = isGroup ? groupImg : src || "";

  const nameFallback = avatarFallback(name);
  return (
    <div className="relative shrink-0">
      <Avatar className={size}>
        <AvatarImage src={avatar} />
        <AvatarFallback className={cn(`bg-primary/10 text-primary font-semibold`, classname && classname)}>
          {nameFallback}
        </AvatarFallback>
      </Avatar>

      {isOnline && !isGroup && (
        <span className="absolute -top-1 -right-1 border-0 ring-0 h-2.5 w-2.5 rounded-full border2 bg-green-500" />
      )}
    </div>
  );
};

export default AvatarBadge;
