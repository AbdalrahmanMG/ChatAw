import { Outlet } from "react-router-dom";

type RouteGuardProps = {
  requiredAuth?: boolean
}
const RouteGuard = ({requiredAuth}: RouteGuardProps) => {
  console.log(requiredAuth)
  return <Outlet/>;
};

export default RouteGuard;
