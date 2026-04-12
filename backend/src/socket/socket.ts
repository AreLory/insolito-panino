import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Order from "../models/orders";

let io: Server;

export const initSocket = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://192.168.1.134:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173"
      ],
      credentials: true
    }
  });

  // 🔐 Middleware JWT
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error("Unauthorized"));

      const decoded = jwt.verify(token, process.env.JWT as string) as any;
      socket.data.user = decoded;

      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  // 🔌 Connessione
  io.on("connection", (socket) => {
    const user = socket.data.user;

    console.log("🟢 Connected:", user.id);

    // 👨‍🍳 auto join kitchen
    if (user.role === "admin" || user.role === "staff") {
      socket.join("kitchen");
    }

    // 👤 join ordine (con sicurezza)
    socket.on("join-order", async (orderId: string) => {
      const order = await Order.findById(orderId);

      if (!order) return;

      if (order.user.toString() !== user.id) return;

      socket.join(`order_${orderId}`);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", user.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket non inizializzato");
  return io;
};