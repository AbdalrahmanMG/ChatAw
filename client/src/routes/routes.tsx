import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Chat from "@/pages/chat/Chat";
import SingleChat from "@/pages/chat/SingleChat";

export const AUTH_ROUTES = {
  SING_IN: "/login",
  SING_UP: "/sign-up",
};

export const PROTECTED_ROUTES = {
  CHAT: "/chat",
  SINGLE_CHAT: "/chat/:chatId",
};

export const authRoutesPaths = [
  {
    path: AUTH_ROUTES.SING_IN,
    element: <SignIn />,
  },
  {
    path: AUTH_ROUTES.SING_UP,
    element: <SignUp />,
  },
];

export const protectedRoutesPaths = [
  {
    path: PROTECTED_ROUTES.CHAT,
    element: <Chat />,
  },
  {
    path: PROTECTED_ROUTES.SINGLE_CHAT,
    element: <SingleChat />,
  },
];

// check the pathname if it auth return true otherwise false
export const isAuthRoute = (pathName: string) => {
  return Object.values(AUTH_ROUTES).includes(pathName);
};
