import { useEffect } from "react";
import { socket } from "../socket/socket";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import {
  selectActiveOrder,
  selectActiveOrderLoading,
} from "../features/activeOrder/activeOrderSelectors";
import {
  fetchActiveOrder,
  setActiveOrder,
} from "../features/activeOrder/activeOrderSlice";

import OrderItemCard from "../components/order/OrderItemCard";
import OrderInfo from "../components/order/OrderInfo";
import Loader from "../components/shared/Loader";

import type { Order, OrderItem } from "../types/order";
import type { AppDispatch } from "../store/store";

import {
  ChevronLeft,
  MoreHorizontal,
  Utensils,
  CreditCard,
  Landmark,
  Coins,
  ShoppingBag,
  Van,
} from "lucide-react";

const statusStyles:any = {
  pending: {
    bg: "bg-gradient-to-r from-gray-500 to-gray-300",
    text: "text-gray-700",
    icon: "text-gray-600",
  },
  accepted: {
    bg: "bg-gradient-to-r from-blue-600 to-blue-400",
    text: "text-blue-700",
    icon: "text-blue-600",
  },
  in_preparation: {
    bg: "bg-gradient-to-r from-orange-700 to-orange-500",
    text: "text-orange-600",
    icon: "text-orange-500",
    shimmer: true,
  },
  ready: {
    bg: "bg-gradient-to-r from-green-600 to-green-400",
    text: "text-green-700",
    icon: "text-green-600",
  },
  completed: {
    bg: "bg-gradient-to-r from-emerald-700 to-emerald-500",
    text: "text-emerald-700",
    icon: "text-emerald-600",
  },
};

const statusCardBg:any = {
  pending: "bg-gray-50 border-gray-200",
  accepted: "bg-blue-50 border-blue-200",
  in_preparation: "bg-orange-50 border-orange-200",
  ready: "bg-green-50 border-green-200",
  completed: "bg-emerald-50 border-emerald-200",
};

const orderTypeStyles = {
  take_away: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    icon: "text-amber-600",
  },
  delivery: {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    icon: "text-indigo-600",
  },
  dine_in: {
    bg: "bg-rose-100",
    text: "text-rose-700",
    icon: "text-rose-600",
  },
};

const paymentStyles = {
  cash: {
    bg: "bg-green-100",
    text: "text-green-700",
    icon: "text-green-600",
  },
  card: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: "text-blue-600",
  },
  online: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    icon: "text-purple-600",
  },
};

const orderTypeIcons = {
  take_away: <ShoppingBag />,
  delivery: <Van />,
  dine_in: <Utensils />,
};

const paymentIcons = {
  cash: <Coins/>,
  card: <CreditCard/>,
  online: <Landmark/>
}

const OrderTracking = () => {
  const dispatch: AppDispatch = useDispatch();
  const order: Order | null = useSelector(selectActiveOrder);
  const loading = useSelector(selectActiveOrderLoading);

  useEffect(() => {
    if (!order) {
      dispatch(fetchActiveOrder());
    }
    console.log(order);
  }, [order, dispatch]);

  useEffect(() => {
    const handleUpdate = (updatedOrder: any) => {
      console.log("📡 socket update:", updatedOrder);
      dispatch(setActiveOrder(updatedOrder));
    };

    if (socket.connected) {
      socket.on("order-status", handleUpdate);
    } else {
      const setupListener = () => {
        socket.on("order-status", handleUpdate);
      };
      socket.once("connect", setupListener);
      return () => socket.off("connect", setupListener);
    }

    return () => {
      socket.off("order-status", handleUpdate);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!order?._id) return;

    const joinOrderRoom = () => {
      socket.emit("join-order", order._id);
      console.log("👤 joined order room:", order._id);
    };

    if (socket.connected) {
      joinOrderRoom();
    } else {
      socket.once("connect", joinOrderRoom);
    }

    socket.on("connect", joinOrderRoom);

    return () => {
      socket.off("connect", joinOrderRoom);
    };
  }, [order?._id]);

  if (!order) return <p>No order found</p>;

  if (loading) return <Loader />;

  const bgStatus = statusCardBg[order.status]
  const status = statusStyles[order.status];
  const payment = paymentStyles[order.paymentMethod];
  const type = orderTypeStyles[order.orderType];

  return (
    <div className="flex flex-col flex-1 pb-32">
      <div className="px-6 py-8 flex items-center relative">
        <Link
          to={"/"}
          className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft size={24} />
        </Link>
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-slate-800">
            Order {`#${new Date(order.createdAt).getTime()}`}
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">
            {order.notes}
          </p>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <div className={`p-5 ${bgStatus} border border-[#FFECEC] rounded-[2.5rem] flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            <div
              className={`relative w-12 h-12 rounded-full flex items-center justify-center text-white ${status.bg}`}
            >
              {status.shimmer && <div className="absolute inset-0 shimmer" />}
              <Utensils size={24} className="relative z-10" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#FF3B30] font-bold">
                Status
              </p>
              <h2 className={`text-lg font-bold ${status.text}`}>
                {order.status.toUpperCase()}
              </h2>
              <p>
                Ready at:{" "}
                {new Date(order.confirmedTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
          <div className="text-[#FF3B30] opacity-50">
            <MoreHorizontal size={32} strokeWidth={3} />
          </div>
        </div>

        <h3 className="text-[11px] uppercase tracking-[0.15em] text-slate-400 font-bold px-1 pt-2">
          Your Order Items
        </h3>

        <div className="space-y-4">
          {order.items.map((item: OrderItem) => (
            <OrderItemCard
              key={`${item.product}-${item.selectedSize?.label}`}
              item={item}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <OrderInfo
            icon={paymentIcons[order.paymentMethod]}
            label="Payment"
            value={order.paymentMethod}
            iconBg={payment.bg}
            iconColor={payment.icon}
          />

          <OrderInfo
            icon={orderTypeIcons[order.orderType]}
            label="Type"
            value={order.orderType}
            iconBg={type.bg}
            iconColor={type.icon}
          />
        </div>

        <div className="pt-6 space-y-10 pb-4">
          <div className="flex justify-between text-slate-500 text-sm font-medium">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          {order.orderType === "delivery" && (
            <div className="flex justify-between text-slate-500 text-sm font-medium">
              <span>Delivery Fee</span>
              <span>${(2.5).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <span className="text-xl font-bold text-slate-800">Total</span>
            <span className="text-3xl font-bold text-[#FF3B30]">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
