import type { Order } from "../../../types/order";
import OrdersDisplay from "./OrdersDisplay";

interface Props {
  orders: Order[];
  handleEdit: (order: Order) => void;
}

export default function OrdersTable({ orders, handleEdit }: Props) {
   const getEffectiveTime = (order: Order) => {
    return new Date(order.confirmedTime || order.requestedTime).getTime();
  };

  const sortedOrders = [...orders].sort(
    (a, b) => getEffectiveTime(a) - getEffectiveTime(b)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 w-full">
      {sortedOrders.map((order) => (
        <OrdersDisplay key={order._id} order={order} onEdit={handleEdit} />
      ))}
    </div>
  );
}
