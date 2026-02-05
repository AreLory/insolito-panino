//Hooks
import { useProductCart } from "../hooks/useProductCart";
import { useState } from "react";

import { getCartItemKey } from "../features/cart/cartSlice";
//interfaces
import type { ICartItem } from "../types/cart";
import type { IProducts } from "../types/products";

//components
import CartCountingControls from "./CartCountingControls";
//assets/img
import crossIcon from '../assets/img/cross.png'

export default function CartItemCard({ item }: { item: ICartItem }) {
  const [showIng, setShowIng] = useState(false);

  const productForHook: IProducts = {
    id: item.id,
    name: item.name,
    category: "burger",
    basePrice: item.basePrice,
    sizes: item.selectedSize
      ? [{ label: item.selectedSize.label, price: item.selectedSize.price }]
      : undefined,
    ingredients: item.selectedIngredients
      ? item.selectedIngredients.map((i) => ({ name: i }))
      : [],
    quantity: item.quantity,
  };

  const { cartItem, quantity, addOne, removeOne, removeAll } = useProductCart(
    productForHook,
    item.selectedSize,
    item.selectedIngredients,
  );

  const handleShowIng = () => {
    setShowIng((prev) => !prev);
  };

  const showTotal = ()=>{
    const total = (item.selectedSize?.price || item.basePrice) * item.quantity
    return total.toFixed(2)
  }
  return (
    <div
      key={getCartItemKey(item)}
      className={`bg-white  rounded shadow flex p-2 w-full ${showIng ? "" : "max-h-38"}`}
    >
      <div className="flex w-[30%]">
        <img
          // src={}
          alt="panino"
          className="size-30 rounded-2xl"
        />
      </div>
      <div className="w-[70%] flex flex-wrap">
        <div className="w-[50%] flex flex-col pl-4">
          <h3 className="text-lg font-bold">{item.name}</h3>
          <h4 className=" text-gray-700">Size: {item.selectedSize?.label}</h4>
          <h4 onClick={handleShowIng} className="text-sm mt-2 underline cursor-pointer">Show Details</h4>
        </div>
        <div className="flex flex-col w-[50%]">
          <div className="flex justify-end w-auto items-center p-2 ">
          <button className="size-4" onClick={removeAll}>
            <img src={crossIcon} alt="X" />
          </button>
          </div>
          <div
            className={`flex flex-col items-centrer p-2 ${showIng ? "" : "collapse"}`}
          >
            <p className="font-semibold text-sm">Ingredienti:</p>
            <div className="text-sm">
              {item.selectedIngredients?.map((i) => (
                <p>- {i}</p>
              ))}
            </div>
          </div>
          
        </div>
        <div className=" flex items-center justify-between w-full px-4">
          <h3 className="text-xl font-semibold">
            € {showTotal()}
          </h3>
          <CartCountingControls
            quantity={quantity}
            onAddToCart={addOne}
            onRemoveFromCart={removeOne}
          />
        </div>
      </div>
    </div>
  );
}
