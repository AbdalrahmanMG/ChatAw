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
        <div className="pl-7 lg:pl-101!">
          <Outlet />
        </div>
      </div>
    </AppWrapper>
  );
}
