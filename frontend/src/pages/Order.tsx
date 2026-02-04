import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import {
  selectCartItems,
  selectCartTotal,
} from "../features/cart/cartSelector";
import { api } from "../config/axios";
import type { IOrder } from "../types/IOrder";
import type { ICartItem } from "../types/ICartState";
import CartItemCard from "../components/CartItemCard";

export default function Order() {
  const cart = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const total = useSelector(selectCartTotal);
  const [notes, setNotes] = useState("no notes");

  const createOrder = async () => {
    try {
      const order = await api.post<IOrder>("/orders", {
        items: cart,
        paymentMethod: "cash",
        orderType: "take_away",
        notes,
      });
      console.log("✅ Order created:", order.data);
      dispatch(clearCart());
    } catch (error: any) {
      console.error(
        "❌ Order error:",
        error?.response?.status,
        error?.response?.data || error.message,
      );
    }
  };

  return (
    <div className="w-screen h-screen  flex flex-col items-center bg-white">
      <h2 className="text-xl my-4">My Cart</h2>
      <div className="w-full max-w-2xl h-[75vh] rounded-2xl py-4">
        {cart?.map((item: ICartItem) => (
          <CartItemCard item={item} />
        ))}
      </div>
      <div className="flex flex-col bg-primary w-full absolute bottom-15 rounded-t-2xl">
        <div className="flex justify-center">
          <h2 className="text-white"> Total: {total} </h2>
        </div>
        <div className="h-12 flex w-full m-2 ">
          <button
            onClick={createOrder}
            disabled={!cart.length}
            className="bg-secondary rounded-full m-1 flex-2"
          >
            Confirm Order
          </button>
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-shade text-white rounded-full m-1 flex-1"
          >
            CLEAR ALL
          </button>
        </div>
      </div>
    </div>
  );
}
