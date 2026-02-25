import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { clearCart, getCartItemKey } from "../features/cart/cartSlice";
import {
  selectCartItems,
  selectCartSubtotal,
  selectTotalItems,
} from "../features/cart/cartSelectors";

import { useAlert } from "../context/AlertContext";

import CartItemCard from "../components/cart/CartItemCard";
import MiniNavBar from "../components/shared/MiniNavBar";

import type { CartItem } from "../types/cart";

import { ArrowLeft, TrashIcon } from "lucide-react";

export default function Cart() {
  const { showAlert } = useAlert();

  const dispatch = useDispatch();
  const cartItems: CartItem[] = useSelector(selectCartItems);
  const total: number = useSelector(selectCartSubtotal);
  const totalItems = useSelector(selectTotalItems);

  const navigate = useNavigate();

  const prevLength = useRef(cartItems.length);

  useEffect(() => {
    if (prevLength.current > 0 && cartItems.length === 0) {
      showAlert("warning", "Empty cart, redirecting in 3 seconds");

      const timer = setTimeout(() => {
        navigate("/menu");
      }, 3000);

      return () => clearTimeout(timer);
    }

    prevLength.current = cartItems.length;
  }, [cartItems, navigate]);

  const handleClear = () => {
    dispatch(clearCart());
    showAlert("success", "Cart cleared");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    <MiniNavBar
      leftChild={<ArrowLeft />}
      rightChild={<TrashIcon />}
      pageName="My Cart"
      goBack="/menu"
      goTo="/checkout"
      onClickAction={handleClear}
    />

    <div className="flex-1 overflow-y-auto w-full flex flex-col items-center px-4 sm:px-6 pt-16 sm:pt-20 pb-40">
      <div className="w-full max-w-2xl flex flex-col gap-2">
        {cartItems?.map((item: CartItem) => (
          <CartItemCard item={item} key={getCartItemKey(item)} />
        ))}
      </div>
    </div>

    {cartItems.length > 0 && (
      <div className="sticky bottom-0 w-full flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-t-2xl shadow-2xl">
          <div className="w-full px-6 pt-6 space-y-3">
            <div className="flex justify-between text-slate-500 text-sm font-medium">
              <span>Products:</span>
              <span>{totalItems} items</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <span className="text-xl font-bold text-slate-800">Total</span>
              <span className="text-3xl font-bold text-orange-500">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="px-6 pb-6 pt-4">
            <Link
              to="/checkout"
              className="w-full bg-linear-to-r from-orange-700 to-orange-500 text-white py-4 sm:py-5 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-200 hover:from-orange-800 hover:to-orange-700 transition-all active:scale-[0.98]"
            >
              <span>Checkout</span>
            </Link>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}
