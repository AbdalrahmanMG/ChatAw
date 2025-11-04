import AppWrapper from "@/components/AppWrapper";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <AppWrapper>
      <Outlet />
    </AppWrapper>
  );
}
