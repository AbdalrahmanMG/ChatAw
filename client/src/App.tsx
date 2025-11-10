import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import AppRoutes from "./routes";
import Logo from "./components/Logo";
import { Spinner } from "./components/ui/spinner";
import { useLocation } from "react-router-dom";
import { isAuthRoute } from "./routes/routes";
import { useSocket } from "./hooks/useSocket";

function App() {
  const { pathname } = useLocation();
  const { user, isAuthStatus, isAuthStatusLoading } = useAuth();
  const isAuthPage = isAuthRoute(pathname);
  const { onlineUsers } = useSocket();
  console.log(onlineUsers, "onlineusers");
  useEffect(() => {
    isAuthStatus();
  }, [isAuthStatus]);

  if (isAuthStatusLoading && !user && !isAuthPage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Logo imgClass="size-20" showText={false} />
        <Spinner className="w-6 h-6" />
      </div>
    );
  }
  return <AppRoutes />;
}

export default App;
