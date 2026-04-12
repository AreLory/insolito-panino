import { Link } from "react-router";

import { Clock, ChevronRight } from "lucide-react";

interface OrderStatusProps {
  orderStatus?: string;
  estimatedTime?: any;
}

export default function OrderStatus({
  orderStatus,
  estimatedTime,
}: OrderStatusProps) {
  return (
    <div className="cursor-pointer bg-linear-to-r from-orange-700 to-orange-500 text-white rounded-2xl p-5 shadow-lg mx-4 mt-4">
      <Link
        to={"/order-tracking"}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-full">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm opacity-90">Your order</p>
            <p className="font-bold text-lg">{orderStatus?.toUpperCase()}</p>
            {estimatedTime && (
              <p className="text-sm opacity-90">
                Ready in {estimatedTime} min
              </p>
            )}
          </div>
        </div>
        <button className="bg-white text-orange-600 p-3 rounded-full hover:scale-105 transition">
          <ChevronRight size={24} />
        </button>
      </Link>
    </div>
  );
}
