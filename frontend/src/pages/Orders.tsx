import { useEffect, useState } from "react";
import { api } from "../config/axios";
import type { Order } from "../types/order";

import { ArrowLeft, HomeIcon } from "lucide-react";
//Components
import MiniNavBar from "../components/shared/MiniNavBar";
import OrderCard from "../components/order/OrderCard";

export default function Orders() {
  const [ordersList, setOrdersList] = useState<Order[]>([]);

  const getOrdersList = async () => {
    try {
      const res = await api.get("/orders");
      console.log(res.data);
      setOrdersList(res.data);
    } catch (error) {
      console.error("Error to fetch orders", error);
    }
  };

  useEffect(() => {
    getOrdersList();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <MiniNavBar
        leftChild={<ArrowLeft />}
        rightChild={<HomeIcon />}
        pageName={"My Orders"}
        goBack="/"
        goTo="/"
      />

      <div className="pt-20 pb-32 max-w-2xl mx-auto">
        <div className="flex flex-col gap-2">
          {ordersList.length > 0 ?
            ordersList.map((order) => <OrderCard order={order} key={order._id}/>) : <p>No orders found, go to menu to do a new order</p>}
        </div>
      </div>
    </div>
  );
}
