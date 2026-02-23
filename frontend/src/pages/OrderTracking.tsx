import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

import {
  selectActiveOrder,
  selectActiveOrderLoading,
} from "../features/activeOrder/activeOrderSelectors";
import { fetchActiveOrder } from "../features/activeOrder/activeOrderSlice";

import OrderItemCard from "../components/order/OrderItemCard";
import OrderInfo from "../components/order/OrderInfo";
import Loader from "../components/shared/Loader";

import type { Order, OrderItem } from "../types/order";

import {
  ChevronLeft,
  MoreHorizontal,
  Utensils,
  CreditCard,
  Bike,
} from "lucide-react";

const OrderTracking = () => {
  const dispatch = useDispatch();
  const order: Order | null = useSelector(selectActiveOrder);
  const loading = useSelector(selectActiveOrderLoading);

  useEffect(() => {
    if (!order) {
      dispatch(fetchActiveOrder());
    }
  }, [order, dispatch]);

  if (!order) return <p>No order found</p>;

  if (loading) return <Loader/>;

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
        <div className="p-5 bg-[#FFF2F2] border border-[#FFECEC] rounded-[2.5rem] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FF3B30] rounded-full flex items-center justify-center text-white">
              <Utensils size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#FF3B30] font-bold">
                Status
              </p>
              <h2 className="text-lg font-bold text-slate-800">
                {order.status}
              </h2>
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
              key={`${item._id}-${item.selectedSize?.label}`}
              item={item}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <OrderInfo
            icon={<CreditCard size={18} />}
            label="Payment"
            value={order.paymentMethod}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <OrderInfo
            icon={<Bike size={18} />}
            label="Type"
            value={order.orderType}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
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
