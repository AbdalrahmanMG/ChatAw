import { Outlet } from "react-router-dom";
import SpeachImg from "@/assets/Speech_bubbles-amico_1.png"

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex ">
      {/* Left illustration section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-8 ">
        <img
          src={SpeachImg}
          alt="speach bubbles"
          className="max-w-lg w-full"
        />
      </div>

      {/* Right auth card section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
