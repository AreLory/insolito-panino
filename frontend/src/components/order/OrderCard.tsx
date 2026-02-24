import { useState } from "react";

import OrderItemCard from "./OrderItemCard";

import type { Order, OrderItem } from "../../types/order";

import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOrdItemsExpanded, setOrdItemsExpanded] = useState(false);
  const orderDate = new Date(order.createdAt);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-all duration-200"
      >
        <div className="flex flex-col items-start">
          <h2 className="text-base font-semibold text-gray-800">
            Order #{orderDate.getTime()}
          </h2>
          <span className="text-sm text-gray-500">
            {orderDate.toDateString()}
          </span>
        </div>

        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500 transition-transform duration-200" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-200" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 pt-4 space-y-5 border-t border-gray-200 bg-gray-50/40">
          <button
            onClick={() => setOrdItemsExpanded(!isOrdItemsExpanded)}
            className="flex w-full items-center justify-between hover:bg-gray-100 px-2 py-2 rounded-lg transition-colors duration-200 text-sm"
          >
            <h2 className="font-medium text-gray-800">
              {order.items.reduce(
                (totalItems: number, item: OrderItem) =>
                  totalItems + (item.quantity ?? 1),
                0,
              )}{" "}
              Products
            </h2>

            {isOrdItemsExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {isOrdItemsExpanded && (
            <div className="space-y-3">
              {order.items.map((item) => (
                <OrderItemCard key={`${item.product}`} item={item} />
              ))}
            </div>
          )}

          <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Order Type</span>
              <span className="font-medium capitalize">{order.orderType}</span>
            </div>

            <div className="flex justify-between">
              <span>Payment Method</span>
              <span className="font-medium capitalize">
                {order.paymentMethod}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>€ {order.subtotal.toFixed(2)}</span>
            </div>

            {order.orderType === "delivery" && (
              <div className="flex justify-between text-gray-700">
                <span>Delivery</span>
                <span>€ 2.50</span>
              </div>
            )}

            <div className="flex justify-between font-semibold text-gray-900 border-t border-gray-200 pt-3">
              <span>Total</span>
              <span>€ {order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
