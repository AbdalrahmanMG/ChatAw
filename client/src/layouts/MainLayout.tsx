import AppWrapper from "@/components/AppWrapper";
import ChatList from "@/components/chat/ChatList";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <AppWrapper>
      <div className="h-ful">
        <div className="block">
          <ChatList />
        </div>
        <Outlet />
      </div>
    </AppWrapper>
  );
}
