import AppWrapper from "@/components/AppWrapper";
import ChatList from "@/components/chat/ChatList";
import useChatId from "@/hooks/useChatId";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const chatId = useChatId()

  return (
    <AppWrapper>
      <div className="h-ful">
        <div className={cn(chatId ? "hidden lg:block" : "block")}>
          <ChatList />
        </div>
        <div className={cn("pl-7 lg:pl-101!", !chatId ? "hidden lg:block" : "block")}>
          <Outlet />
        </div>
      </div>
    </AppWrapper>
  );
}
