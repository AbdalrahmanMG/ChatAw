import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PenBoxIcon, Search, UsersIcon } from "lucide-react";

import { useChat } from "@/hooks/useChat";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import NewGroupItem from "./NewGroupItem";
import ChatUserItem from "./UserListItem";
import GroupUserItem from "./GroupListItem";

const NewChatPopover = memo(() => {
  const navigate = useNavigate();
  const { fetchAllUsers, users, isUsersLoading, createChat, isCreatingChat } =
    useChat();

  const [isOpen, setIsOpen] = useState(false);
  const [isGroupMode, setIsGroupMode] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchAllUsers();
    }
  }, [fetchAllUsers, isOpen]);

  const toggleUserSelection = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const resetState = useCallback(() => {
    setIsGroupMode(false);
    setGroupName("");
    setSelectedUsers([]);
    setLoadingUserId(null);
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetState();
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedUsers?.length === 0) return;

    const response = await createChat({
      isGroup: true,
      participants: selectedUsers,
      groupName: groupName,
    });
    console.log(response, "create group chat");

    // if(response?._id){

    setIsOpen(false);
    resetState();
    navigate(`/chat/${response?._id}`);
    // }
  };

  const handleCreateChat = async (userId: string) => {
    setLoadingUserId(userId);

    const response = await createChat({
      isGroup: false,
      participantId: userId,
    });
    console.log(response, "create chat normal");

    setIsOpen(false);
    resetState();
    navigate(`/chat/${response?._id}`);
  };

  const canCreateGroup =
    groupName.trim() && selectedUsers.length > 0 && !isCreatingChat;

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Start new chat"
        >
          <PenBoxIcon className="h-5! w-5! stroke-1!" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-80 z-999 p-0
         rounded-xl min-h-[400px]
         max-h-[80vh] flex flex-col
        "
      >
        <div className="border-b p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {isGroupMode && (
              <Button
                variant="ghost"
                size="icon"
                onClick={resetState}
                aria-label="Back to new chat"
              >
                <ArrowLeft size={16} />
              </Button>
            )}
            <h3 className="text-lg font-semibold">
              {isGroupMode ? "New Group" : "New Chat"}
            </h3>
          </div>

          <InputGroup>
            <InputGroupInput
              value={isGroupMode ? groupName : ""}
              onChange={
                isGroupMode ? (e) => setGroupName(e.target.value) : undefined
              }
              placeholder={isGroupMode ? "Enter group name" : "Search name"}
            />
            <InputGroupAddon>
              {isGroupMode ? <UsersIcon /> : <Search />}
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex-1 overflow-y-auto p-1 space-y-1">
          {isUsersLoading ? (
            <div className="flex justify-center p-4">
              <Spinner className="w-6 h-6" />
            </div>
          ) : users && users?.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No users found
            </div>
          ) : !isGroupMode ? (
            <>
              <NewGroupItem
                disabled={isCreatingChat}
                onClick={() => setIsGroupMode(true)}
              />
              {users?.map((user) => (
                <ChatUserItem
                  key={user._id}
                  user={user}
                  isLoading={loadingUserId === user._id}
                  disabled={loadingUserId !== null}
                  onClick={handleCreateChat}
                />
              ))}
            </>
          ) : (
            users?.map((user) => (
              <GroupUserItem
                key={user._id}
                user={user}
                isSelected={selectedUsers.includes(user._id)}
                onToggle={toggleUserSelection}
              />
            ))
          )}
        </div>

        {isGroupMode && (
          <div className="border-t p-3">
            <Button
              onClick={handleCreateGroup}
              className="w-full"
              disabled={!canCreateGroup}
            >
              {isCreatingChat && <Spinner className="w-4 h-4" />}
              Create Group
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
});

export default NewChatPopover;
