import MainLayout from "@/layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import { authRoutesPaths, protectedRoutesPaths } from "./routes";
import LandingPage from "@/pages/LandingPage";
import AuthLayout from "@/layouts/AuthLayout";
import RouteGuard from "./RouteGuard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* home/landing */}
      <Route path="/" element={<LandingPage />} />
      
      {/* auth routes */}
      <Route element={<RouteGuard requiredAuth={false}/>}>
        <Route element={<AuthLayout />}>
          {authRoutesPaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>

      <Route element={<RouteGuard requiredAuth={true}/>}>
        <Route element={<MainLayout />}>
          {protectedRoutesPaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
