import MainLayout from "@/layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import { authRoutesPaths, protectedRoutesPaths } from "./routes";
import LandingPage from "@/pages/LandingPage";
import AuthLayout from "@/layouts/AuthLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* home/landing */}
      <Route path="/" element={<LandingPage />} />
        
      {/* <Route path="/ee"> */}
        <Route element={<AuthLayout />}>
          {authRoutesPaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      {/* </Route> */}

      {/* <Route path="/bb"> */}
        <Route element={<MainLayout />}>
          {protectedRoutesPaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      {/* </Route> */}
    </Routes>
  );
};

export default AppRoutes;
