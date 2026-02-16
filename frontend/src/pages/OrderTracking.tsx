import {
  ChevronLeft,
  MoreHorizontal,
  Utensils,
  CreditCard,
  Bike,
  Truck,
} from "lucide-react";

import { useEffect } from "react";
import { fetchActiveOrder } from "../features/activeOrder/activeOrderSlice";
import OrderItemCard from "../components/OrderItemCard";
import OrderInfo from "../components/OrderInfo";
import { useDispatch, useSelector } from "react-redux";
import type { Order, OrderItem } from "../types/order";
import {
  selectActiveOrder,
  selectActiveOrderLoading,
} from "../features/activeOrder/activeOrderSelectors";
const OrderTracking = () => {
  const dispatch = useDispatch();
  const order:Order| null = useSelector(selectActiveOrder);
  const loading = useSelector(selectActiveOrderLoading);

  useEffect(() => {
    if (!order) {
      dispatch(fetchActiveOrder());
    }
  }, [order, dispatch]);

  if (!order) return <p>No order found</p>
  

  return (
    <div className="flex flex-col flex-1 pb-32">
      {/* Header */}
      <div className="px-6 py-8 flex items-center relative">
        <button className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-slate-800">
            Order {order.user}
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">
            {order.notes}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-6 space-y-6">
        {/* Status Banner */}
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

        {/* Section Title */}
        <h3 className="text-[11px] uppercase tracking-[0.15em] text-slate-400 font-bold px-1 pt-2">
          Your Order Items
        </h3>

        <div className="space-y-4">
          {order.items.map((item: OrderItem) => (
            <OrderItemCard key={item._id} item={item} />
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

        <div className="pt-6 space-y-3 pb-4">
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

      {/* Sticky Action Button
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-6 py-6 sm:pb-8 bg-white/80 backdrop-blur-md">
        <button className="w-full bg-[#FF3B30] text-white py-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#FF3B30]/20 hover:bg-[#E03429] transition-all active:scale-[0.98]">
          <Truck size={20} fill="currentColor" />
          <span>Track Order</span>
        </button>
      </div> */}
    </div>
  );
};

export default OrderTracking;
