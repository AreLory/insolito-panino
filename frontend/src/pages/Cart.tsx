//hooks
import { useSelector, useDispatch } from "react-redux";
//components
import CartItemCard from "../components/cart/CartItemCard";
import { Link } from "react-router";
import MiniNavBar from "../components/shared/MiniNavBar";

//interfaces
import type { CartItem } from "../types/cart";

import trashImg from "../assets/img/trash.png";
import arrowLeft from "../assets/img/arrow-left.png";

import { clearCart, getCartItemKey } from "../features/cart/cartSlice";
import {
  selectCartItems,
  selectCartSubtotal,
  selectTotalItems,
} from "../features/cart/cartSelectors";

export default function Cart() {
  const cart = useSelector(selectCartItems);
  const total: number = useSelector(selectCartSubtotal);
  const dispatch = useDispatch();
  const totalItems = useSelector(selectTotalItems);
  const clear = () => {
    dispatch(clearCart());
  };

  return (
    <div className="w-screen h-screen flex justify-center bg-white">
      <div className="flex flex-col items-center shadow-2xl w-full max-w-3xl h-[65vh] rounded-2xl">
        <MiniNavBar
          rightImg={trashImg}
          leftImg={arrowLeft}
          pageName={"My Cart"}
          onClick={clear}
          linkTo="/menu"
        />
        <div className="w-full max-w-2xl h-[65vh] overflow-y-auto rounded-2xl py-4">
          {cart?.map((item: CartItem) => (
            <CartItemCard item={item} key={getCartItemKey(item)} />
          ))}
        </div>
        {cart.length > 0 && (
          <div className="flex flex-col items-center bg-white shadow-2xl w-full max-w-3xl absolute bottom-25 rounded-2xl">
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
