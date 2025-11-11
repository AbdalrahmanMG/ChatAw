import { UsersIcon } from "lucide-react";
import { memo } from "react";

interface NewGroupProps {
  disabled: boolean;
  onClick: () => void;
}

const NewGroupItem = memo(({ disabled, onClick }: NewGroupProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full flex items-center
       gap-2 p-2 rounded-sm hover:bg-accent
       transition-colors text-left disabled:opacity-50
      "
  >
    <div className="bg-primary/10 p-2 rounded-full">
      <UsersIcon className="size-4 text-primary" />
    </div>
    <span>New Group</span>
  </button>
));

export default NewGroupItem;
