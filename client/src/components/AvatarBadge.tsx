import groupImg from "@/assets/group-img.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { avatarFallback } from "@/utils/utils";
interface AvatarProps {
  name: string;
  src: string | null;
  size?: string;
  isOnline?: boolean;
  isGroup?: boolean;
}
const AvatarBadge = ({
  name,
  src,
  size,
  isOnline,
  isGroup = false,
}: AvatarProps) => {
  const avatar = isGroup ? groupImg : src || "";

  const nameFallback = avatarFallback(name);
  return (
    <div className="relative shrink-0">
      <Avatar className={size}>
        <AvatarImage src={avatar} />
        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
          {nameFallback}
        </AvatarFallback>
      </Avatar>

      {isOnline && !isGroup && (
        <span className="absolute border-0 ring-0 h-2.5 w-2.5 rounded-full border2 bg-green-500" />
      )}
    </div>
  );
};

export default AvatarBadge;
