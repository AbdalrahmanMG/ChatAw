import type { ReactNode } from "react";

type AppWrapperProps = {
  children: ReactNode;
};

const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <div className="h-full">
      <main className="h-full">{children}</main>
    </div>
  );
};

export default AppWrapper;
