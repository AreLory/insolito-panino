import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchOrders } from "../../features/orders/ordersSlice";

import API_BASE_URL from "../../config/api";
import { api } from "../../config/axios";

import OrdersTable from "../components/order/OrdersTable";
import Loader from "../../components/shared/Loader";
import OrderForm from "../components/order/OrderForm";
import MiniNavBar from "../../components/shared/MiniNavBar";

import type { AppDispatch, RootState } from "../../store/store";

import type { Order } from "../../types/order";

import { ChevronLeft } from "lucide-react";

export default function AdminOrders() {
  const dispatch: AppDispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.data);

  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setIsEditing(true);
  };

  const handleUpdate = async (data: Partial<Order>) => {
    if (!editingOrder?._id) return;
    try {
      await api.patch(`${API_BASE_URL}/orders/${editingOrder._id}`, data);
      dispatch(fetchOrders());

      setIsEditing(false);
      setEditingOrder(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (!orders) return;

  const todoOrders = orders
    .filter(
      (order) =>
        !order.items.every((item) =>
          item.name.toLowerCase().includes("arrosticini"),
        ),
    )
    .sort((a, b) =>
  new Date(a.confirmedTime ?? 0).getTime() -
  new Date(b.confirmedTime ?? 0).getTime()
);

  return (
    <div className="flex flex-col pt-18 justify-center items-center overflow-x-hidden">
      <MiniNavBar
        leftChild={<ChevronLeft />}
        goBack="/admin"
        pageName="Orders List"
      />

      {orders ? (
        <OrdersTable orders={todoOrders} handleEdit={handleEdit} />
      ) : (
        <Loader />
      )}

      {isEditing && editingOrder && (
        <OrderForm
          onSubmit={handleUpdate}
          onClose={() => setIsEditing(false)}
          initialValues={editingOrder}
        />
      )}
    </div>
  );
}
