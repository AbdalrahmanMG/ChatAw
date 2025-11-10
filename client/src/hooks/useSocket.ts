import { io, type Socket } from "socket.io-client";
import { create } from "zustand";

const BaseUrl =
  import.meta.env.MODE === "development" ? import.meta.env.VITE_API_URL : "/";

  const SOCKET_URL = BaseUrl.replace(/\/api$/, "");

interface ISocketState {
  socket: Socket | null;
  onlineUsers: string[];
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useSocket = create<ISocketState>()((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: () => {
    const { socket } = get();
    if (socket?.connected) return;

    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: true,
    });

    set({ socket: newSocket });
    newSocket.on("connect", () => {
      console.log("Socket connected", newSocket.id);
    });

    newSocket.on("online:users", (userIds) => {
      console.log("Online users", userIds);
      set({ onlineUsers: userIds });
    });

    newSocket.on("connect_error", (err) => {
      console.log("CONNECT ERROR:", err.message);
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
