import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchOrders } from "../../features/orders/ordersSlice";

import MiniNavBar from "../../components/shared/MiniNavBar";

import type { AppDispatch, RootState } from "../../store/store";

import { ChevronLeft } from "lucide-react";
import OrderCard from "../../components/order/OrderCard";

export default function AdminOrders() {
  const dispatch: AppDispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.data);

  useEffect(()=>{
    dispatch(fetchOrders())
  }, [dispatch])
  
  return (<div className="flex flex-col pt-18 justify-center items-center overflow-x-hidden">

      <MiniNavBar
        leftChild={<ChevronLeft />}
        goBack="/admin"
        pageName="Orders List"
      />
      
      {orders?.map((order)=><OrderCard  order={order}/>)}
      {/* <div className="px-2">
        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isEditing && editingProduct && (
        <ProductForm
          initialValues={editingProduct}
          categories={categories}
          extras={extras}
          onSubmit={handleUpdate}
          onClose={() => setIsEditing(false)}
        />
      )}

      {isCreating && (
        <ProductForm
          categories={categories}
          extras={extras}
          onSubmit={handleCreate}
          onClose={() => setIsCreating(false)}
        />
      )} */}
    </div>);
}
