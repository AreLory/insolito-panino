import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "../context/AuthContext";
import { socket } from "../socket/socket";

import { fetchActiveOrder, setActiveOrder } from "../features/activeOrder/activeOrderSlice";
import {
  selectActiveOrder,
  selectActiveOrderLoading,
} from "../features/activeOrder/activeOrderSelectors";
import {
  selectCartItems,
  selectTotalItems,
} from "../features/cart/cartSelectors";

import Header from "../components/home/Header";
import OrderStatus from "../components/home/OrderStatus";
import MenuCategories from "../components/home/MenuCategories";
import LocationSection from "../components/home/LocationSection";
import QuickAccess from "../components/home/QuickAccess";
import BrandStory from "../components/home/BrandStory";
import Loader from "../components/shared/Loader";

import type { AppDispatch } from "../store/store";


const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const {role} = useAuth()
  const order = useSelector(selectActiveOrder);
  const loading = useSelector(selectActiveOrderLoading);
  const cart = useSelector(selectCartItems);
  const cartItemsQuantity = useSelector(selectTotalItems);

  useEffect(() => {
    if (!order) {
      dispatch(fetchActiveOrder());
    }
  }, [order, dispatch]);

    useEffect(() => {
      const handleUpdate = (updatedOrder: any) => {
        console.log("📡 socket update:", updatedOrder);
        dispatch(setActiveOrder(updatedOrder));
      };
  
      if (socket.connected) {
        socket.on("order-status", handleUpdate);
      } else {
        const setupListener = () => {
          socket.on("order-status", handleUpdate);
        };
        socket.once("connect", setupListener);
        return () => socket.off("connect", setupListener);
      }
  
      return () => {
        socket.off("order-status", handleUpdate);
      };
    }, [dispatch]);
  
    useEffect(() => {
      if (!order?._id) return;
  
      const joinOrderRoom = () => {
        socket.emit("join-order", order._id);
        console.log("👤 joined order room:", order._id);
      };
  
      if (socket.connected) {
        joinOrderRoom();
      } else {
        socket.once("connect", joinOrderRoom);
      }
  
      socket.on("connect", joinOrderRoom);
  
      return () => {
        socket.off("connect", joinOrderRoom);
      };
    }, [order?._id]);

const getRemainingMinutes = (confirmedTime:string) => {
  const now = new Date();
  const confirmedDate = new Date(confirmedTime);

  const diffMs = confirmedDate - now;
  const minutes = Math.ceil(diffMs / 60000);

  return Math.max(0, minutes);
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cartItemsQuantity} />

      {loading && <Loader />}

      {order && order?.status != "completed" && (
        <OrderStatus
          orderStatus={order.status}
          estimatedTime={getRemainingMinutes(order.confirmedTime)}
        />
      )}

      <MenuCategories />

      <LocationSection />

      <QuickAccess isAdmin={role === 'admin'}/>

      <BrandStory
        title="Our Story"
        story="Born from a passion for authentic street food, we bring unique flavors and uncompromising quality to Italian squares. Every ingredient is carefully selected, and every recipe is the result of years of experience."
        imageUrl="https://images.pexels.com/photos/4253320/pexels-photo-4253320.jpeg?auto=compress&cs=tinysrgb&w=800"
      />
      <div className="sticky bottom-0 p-4 bg-linear-to-t from-gray-50 to-transparent">
        {cart.length > 0 && (
          <button className="w-full bg-linear-to-r  from-orange-700 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition flex items-center justify-center gap-2">
            🛒 Go to cart ({cartItemsQuantity} items)
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
