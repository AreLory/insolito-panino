import { io, Socket } from "socket.io-client";

export const socket: Socket = io("http://localhost:5000", {
  autoConnect: false,
  transports: ["websocket"],
  withCredentials: true,
});

export const connectSocket = (token: string | null) => {
  if (!token) return;
  socket.auth = { token };
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

socket.on("connect_error", (error) => {
  console.error("Socket connect error:", error);
});