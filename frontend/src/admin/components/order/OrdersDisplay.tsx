import { useDispatch } from "react-redux";

import { fetchOrders } from "../../../features/orders/ordersSlice";

import API_BASE_URL from "../../../config/api";
import { api } from "../../../config/axios";

import type { Order, OrderStatus } from "../../../types/order";
import type { AppDispatch } from "../../../store/store";

interface Props {
  order: Order;
  onEdit: (order: Order) => void;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-blue-100 text-blue-800",
  in_preparation: "bg-orange-100 text-orange-800",
  ready: "bg-green-100 text-green-800",
  completed: "bg-gray-200 text-gray-700",
};

export default function OrdersDisplay({ order, onEdit }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const handleQuickUpdate = async (orderId: string, data: Partial<Order>) => {
    try {
      await api.patch(`${API_BASE_URL}/orders/${orderId}`, data);
      dispatch(fetchOrders());
    } catch (error) {
      console.log(error);
    }
  };

  const addMinutesToISO = (iso: string, minutes: number) => {
    const date = new Date(iso);
    date.setMinutes(date.getMinutes() + minutes);
    return date.toISOString();
  };

  const quick = (status: OrderStatus, minutes: number) => {
    const baseTime = order.confirmedTime || order.requestedTime;

    const confirmedTime = addMinutesToISO(baseTime, minutes);

    handleQuickUpdate(order._id, {
      status,
      confirmedTime,
    });
  };

  const renderActions = () => {
    switch (order.status) {
      case "pending":
        return (
          <>
            <button onClick={() => quick("accepted", 0)} className="text-xs bg-green-500 text-white px-3 py-1 rounded w-50 h-10">Accetta</button>
          </>
        );

      case "accepted":
        return (
          <>
            <button onClick={() => quick("in_preparation", 0)} className="text-xs bg-orange-500 text-white px-3 py-1 rounded w-50 h-10">
              In preparazione
            </button>
            <button onClick={() => quick("accepted", 10)} className="text-xs bg-red-500 text-white px-3 py-1 rounded h-10">+10 min</button>
          </>
        );

      case "in_preparation":
        return (
          <>
            <button onClick={() => quick("ready", 0)} className="text-xs bg-green-500 text-white px-3 py-1 rounded w-50 h-10">Pronto</button>
          </>
        );

      case "ready":
        return <button onClick={() => quick("completed", 0)} className="text-xs bg-red-500 text-white px-3 py-1 rounded w-50 h-10">Termina</button>;

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col gap-4 border border-gray-300">
      {/* HEADER */}
      <div>
        <div
          className={`flex justify-between items-start ${statusColors[order.status]} rounded-t-2xl p-3`}
        >
          <div>
            <div className="font-bold text-lg">
              {order.user?.fullName || "Cliente"}
            </div>
            <div className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleTimeString()}
            </div>
          </div>

          {order.status === "pending" ? (
            <div className="flex flex-col items-end gap-1">
              <div className="font-bold text-lg">
                {new Date(order.requestedTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className={`${statusColors[order.status]} text-sm`}>
                {order.status}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-end gap-1">
              <div className="font-bold text-lg">
                {new Date(order.confirmedTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className={`${statusColors[order.status]} text-sm`}>
                {order.status}
              </div>
            </div>
          )}
        </div>
        <div className="px-2">
          Order type: {order.orderType.toLocaleUpperCase()}
        </div>
      </div>

      {/* ITEMS */}
      <div className="flex flex-col p-2 gap-1 h-full">
        {order.items.map((item, i) => (
          <div key={i} className="p-2 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">{item.name}</span>

              <span className="text-lg font-bold">x{item.quantity}</span>
            </div>

            {/* VARIANTI */}
            {item.selectedSize && (
              <div className="text-md text-gray-700">
                Size: {item.selectedSize.label}
              </div>
            )}

            {/* EXTRA */}
            {item.selectedExtras?.length > 0 && (
              <div className="text-md text-green-600">
                + {item.selectedExtras.map((e) => e.name).join(", ")}
              </div>
            )}

            {/* RIMOSSI */}
            {item.removedIngredients?.length > 0 && (
              <div className="text-md text-red-500">
                - {item.removedIngredients.join(", ")}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* NOTE */}
      {order.notes && (
        <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
          📝 {order.notes}
        </div>
      )}

      {/* FOOTER */}
      <div className="flex justify-center items-center mt-2">

        <div className="flex gap-2 p-2">
          {renderActions()}

          <button onClick={() => onEdit(order)} className="text-xs bg-blue-500 text-white px-3 py-1 rounded w-50 h-10">Gestisci</button>
        </div>
      </div>
    </div>
  );
}
