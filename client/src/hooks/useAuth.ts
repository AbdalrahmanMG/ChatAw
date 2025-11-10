import type { LoginType, RegisterType, UserType } from "@/types/authType";
import { persist } from "zustand/middleware";
import { create } from "zustand";
import { API } from "@/lib/axios";
import { toast } from "sonner";
import { useSocket } from "./useSocket";

interface IAuthState {
  user: UserType | null;
  isLoggingIn: boolean;
  isSigningup: boolean;
  isAuthStatusLoading: boolean;

  register: (data: RegisterType) => void;
  login: (data: LoginType) => void;
  logout: () => void;
  isAuthStatus: () => void;
}

export const useAuth = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggingIn: false,
      isSigningup: false,
      isAuthStatusLoading: false,

      register: async (data: RegisterType) => {
        set({ isSigningup: true });
        try {
          const res = await API.post("/auth/register", data);
          set({ user: res.data.user });
          useSocket.getState().connectSocket();
          toast.success("Register successfully");
        } catch (error: Error | unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Register failed");
        } finally {
          set({ isSigningup: false });
        }
      },
      login: async (data: LoginType) => {
        set({ isLoggingIn: true });
        try {
          const res = await API.post("/auth/login", data);
          set({ user: res.data.user });
          useSocket.getState().connectSocket();
          toast.success("Login successfully");
        } catch (error: Error | unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Login failed");
        } finally {
          set({ isLoggingIn: false });
        }
      },
      logout: async () => {
        try {
          await API.post("/auth/logout");
          set({ user: null });
          useSocket.getState().disconnectSocket();
          toast.success("Logout successfully");
        } catch (error: Error | unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Login failed");
        }
      },
      isAuthStatus: async () => {
        set({ isAuthStatusLoading: true });
        try {
          const res = await API.get("/auth/status");
          set({ user: res.data.user });
          useSocket.getState().connectSocket();
        } catch (error: Error | unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          toast.error(err.response?.data?.message || "Authentication failed");
        } finally {
          set({ isAuthStatusLoading: false });
        }
      },
    }),
    {
      name: "root-auth",
    }
  )
);
