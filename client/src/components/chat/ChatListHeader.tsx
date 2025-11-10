import { Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";

interface ChatListHeaderProps {
  onSearch: (val: string) => void
}

const ChatListHeader = ({onSearch} : ChatListHeaderProps) => {
  
  return <div className="p-3 border-b border-border">
    <div className="flex items-center justify-between mb-3">
      <h1 className="text-xl font-semibold">Chats</h1>
    </div>
    <div>
      <InputGroup className="text-sm">
        <InputGroupInput 
          placeholder="Search..."
          onChange={e => onSearch(e.target.value)}
        />
        <InputGroupAddon>
          <Search className="text-muted-foreground" size={16}/>
        </InputGroupAddon>
      </InputGroup>
    </div>
  </div>;


};

export default ChatListHeader;
