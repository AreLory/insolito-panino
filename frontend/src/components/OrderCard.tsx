import API_BASE_URL from "../config/api";
import { useEffect, useState } from "react";
import type { IOrder, IOrderItem } from "../types/order";
import { api } from "../config/axios";

export default function OrderCard() {
  const [lastOrder, setLastOrder] = useState<IOrder | null>(null);

  const getLastOrder = async () => {
    try {
      const res = await api.get(`${API_BASE_URL}/orders/me`);

      setLastOrder(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error to fetch product", error);
    }
  };

  useEffect(() => {
    getLastOrder();
  }, []);

  return (
    <div>
      <div className="bg-blue-300 w-90">
        <h1>Status: {lastOrder?.status}</h1>
        <h1>PaymentMethod: {lastOrder?.paymentMethod}</h1>
        <h1>PaymentStatus: {lastOrder?.paymentStatus}</h1>
       
        <h1>{lastOrder?.items[0].name} x {lastOrder?.items[0].quantity}</h1>
        <h1> Total: {lastOrder?.total}</h1>
      </div>
    </div>
  );
}
