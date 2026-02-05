import { clearCart } from "../features/cart/cartSlice";

import type { ICartItem } from "../types/ICartState";
import CartItemCard from "../components/CartItemCard";
import { Link } from "react-router";
import trashImg from "../assets/img/trash.png";
import arrowLeft from "../assets/img/arrow-left.png";
import { selectCartItems, selectCartTotal, selectTotalItems } from "../features/cart/cartSelector";
import { useSelector, useDispatch } from "react-redux";
import MiniNavBar from "../components/MiniNavBar";


export default function Cart() {
  const cart = useSelector(selectCartItems);
  const total: number = useSelector(selectCartTotal);
  const dispatch = useDispatch()
  const totalItems = useSelector(selectTotalItems)
  const clear = ()=>{ dispatch(clearCart())}

  
  
  return (
    <div className="w-screen h-screen flex justify-center bg-white">
      <div className="w-full md:max-w-4xl md:w-4xl flex flex-col items-center">
        <MiniNavBar
        rightImg={trashImg}
        leftImg={arrowLeft}
        pageName={'My Cart'}
        onClick={clear}
        linkTo="/menu"
        />
        <div className="w-full max-w-2xl h-[65vh] overflow-y-auto rounded-2xl py-4">
          {cart?.map((item: ICartItem) => (
            <CartItemCard item={item} key={item.id}/>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="flex flex-col items-center bg-white shadow-2xl w-full max-w-3xl absolute bottom-25 rounded-2xl">
            <div className="w-full">
              <div className="flex justify-around mt-1">
                <h2 className=" text-lg"> Product </h2>
                <h2 className=" text-lg"> {totalItems} items </h2>
              </div>
            <div className="flex justify-around mt-1">
                <h2 className=" text-lg"> Total: </h2>
                <h2 className=" text-lg"> € {total.toFixed(2)} </h2>
              </div>
            </div>
            <div className="h-20 py-4 px-8 mb-2 flex w-full">
              <Link
                to={"/checkout"}
                aria-disabled={!cart.length}
                className="bg-secondary rounded-full m-1 flex-2 text-center"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
