import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

type RouteGuardProps = {
  requiredAuth?: boolean;
};
const RouteGuard = ({ requiredAuth }: RouteGuardProps) => {
  const { user } = useAuth();
  if (requiredAuth && !user) {
    return <Navigate to="/" replace />;
  }
  if (!requiredAuth && user) {
    return <Navigate to="/chat" replace />;
  }

  return <Outlet />;
};

export default RouteGuard;
