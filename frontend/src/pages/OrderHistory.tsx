import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";
import type { IOrder } from "../types/IOrder";
import { api } from "../config/axios";
import OrderCard from "../components/OrderCard";

export default function OrderHistory() {
  const [oldOrdersList, setOldOrdersList] = useState<IOrder[]>([]);
  const getOldOrders = async () => {
    try {
      const oldOrders = await api.get(`${API_BASE_URL}/orders/me`);

      setOldOrdersList(oldOrders.data);
    } catch (error: any) {
      console.log('Error to fetch orders', error)
    }
  };

  useEffect(() => {
    getOldOrders();
  }, []);

  return (
    <div>
      {/* {oldOrdersList?.map((order: IOrder) => (
        <div>
          <h1>{order.user}</h1>
          <h2>Order Type: {order.orderType}</h2>
          <h2>Payment Method: {order.paymentMethod}</h2>
          <h2>Payment Status: {order.paymentStatus}</h2>
          <h2>Total: € {order.total}</h2>
        </div>
      ))} */}
      <OrderCard/>
    </div>
  );
}
