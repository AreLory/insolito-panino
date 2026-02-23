import { useEffect, useState } from "react";

import { useAlert } from "../context/AlertContext";

import MiniNavBar from "../components/shared/MiniNavBar";
import OrderCard from "../components/order/OrderCard";

import { api } from "../config/axios";

import type { Order } from "../types/order";

import { ArrowLeft, HomeIcon } from "lucide-react";
import Loader from "../components/shared/Loader";



export default function OrdersHistory() {
  const {showAlert} = useAlert()
  
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false)
  
  const getOrdersList = async () => {
    setLoading(true)
    try {
      const res = await api.get("/orders");
      setOrdersList(res.data);
    } catch (error) {
      showAlert( 'error' , "Error to fetch orders" + error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getOrdersList();
  }, []);

  if (loading) return <Loader/>
  
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
