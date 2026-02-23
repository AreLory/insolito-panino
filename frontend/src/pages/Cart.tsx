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
    <div className="min-h-screen">
      <MiniNavBar
        leftChild={<ArrowLeft />}
        rightChild={<TrashIcon />}
        pageName="My Cart"
        goBack="/menu"
        goTo="/checkout"
        onClickAction={handleClear}
      />
      <div className="pt-20 pb-32 max-w-2xl mx-auto">
        <div className="flex flex-col items-center bg-white">
          {cartItems?.map((item: CartItem) => (
            <CartItemCard item={item} key={getCartItemKey(item)} />
          ))}
        </div>
        {cartItems.length > 0 && (
          <div className="flex flex-col items-center bg-white shadow-2xl w-full max-w-3xl absolute bottom-0 rounded-2xl">
            <div className="w-full pt-6 space-y-3 pb-4 px-6">
              <div className="flex justify-between text-slate-500 text-sm font-medium">
                <span>Products:</span>
                <span>{totalItems} items</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-xl font-bold text-slate-800">Total</span>
                <span className="text-3xl font-bold text-[#FF3B30]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="h-20 py-4 px-8 mb-2 flex w-full">
              <Link
                to="/checkout"
                className="w-full bg-[#FF3B30] text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-[#FF3B30]/20 hover:bg-[#E03429] transition-all active:scale-[0.98]"
              >
                <span>Checkout</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
