import type { ReactNode } from "react";
import Sidebar from "./chat/Sidebar";

type AppWrapperProps = {
  children: ReactNode;
};

const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <div className="h-full">
      <Sidebar/>
      <main className="h-full lg:pl-10">{children}</main>
    </div>
  );
};

export default AppWrapper;
