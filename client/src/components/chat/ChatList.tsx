import { useChat } from "@/hooks/useChat";
import { useEffect } from "react";
import { Spinner } from "../ui/spinner";
import ChatListItem from "./ChatListItem";

const ChatList = () => {
  const { fetchChats, chats, isChatsLoading } = useChat();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <div
      className="fixed inset-y-0
      pb-20 lg:pb-0
      lg:max-w-[379px]
      lg:block
      border-r
      border-border
      bg-sidebar
      max-w-[calc(100%-40px)]
      w-full
      left-10
      z-98
    "
    >
      <div className="flex-col">
        {isChatsLoading ? (
          <div>
            <Spinner />
          </div>
        ) : chats?.length === 0 ? (
          <div>No Chats Created</div>
        ) : (
          chats?.map((chat) => (
            <ChatListItem key={chat._id} chat={chat} onClick={() => null} />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
