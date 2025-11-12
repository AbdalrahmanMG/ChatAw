import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import NewChatPopover from "./new chat popover/NewChatPopover";

interface ChatListHeaderProps {
  onSearch: (val: string) => void;
}

const ChatListHeader = ({ onSearch }: ChatListHeaderProps) => {
  return (
    <div className="p-4 border-b border-border">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-semibold text-foreground">Messages</h1>
        <NewChatPopover />
      </div>
      <div className="relative">
        <InputGroup className="text-sm rounded-full px-1 py-5.5">
          <InputGroupInput
            placeholder="Search for chats..."
            onChange={(e) => onSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search className="text-muted-foreground" size={16} />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
};

export default ChatListHeader;
