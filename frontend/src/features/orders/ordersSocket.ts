import { socket } from "../../socket/socket";
import type { AppDispatch } from "../../store/store";

import { orderAddedRealtime, orderUpdatedRealtime } from "./ordersSlice";

import { fetchOrders } from "./ordersSlice";

let initialized = false;

export const initOrdersSocket = (dispatch: AppDispatch) => {
  if (initialized) return;
  initialized = true;

  console.log("📡 Orders socket initialized");

  socket.on("new-order", (order) => {
    console.log("🔥 new-order received", order);
    dispatch(orderAddedRealtime(order));
  });

  socket.on("order-updated", (order) => {
    console.log("🔄 order-updated received", order);
    dispatch(orderUpdatedRealtime(order));
  });

  socket.on("connect", () => {
    console.log("🟢 socket reconnected → resync orders");
    dispatch(fetchOrders());
  });
};

export const cleanupOrdersSocket = () => {
  socket.off("new-order");
  socket.off("order-updated");
  socket.off("connect");
};
