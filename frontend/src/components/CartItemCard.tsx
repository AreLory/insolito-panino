import { useDispatch} from "react-redux";

import {
  addToCart,
  getCartItemKey,
  removeFromCart,
} from "../features/cart/cartSlice";

import img1 from "../config/data";
import { useState } from "react";
import type { ICartItem } from "../types/ICartState";


export default function CartItemCard({item}:{item:ICartItem}) {
  const dispatch = useDispatch();
  const [showIng, setShowIng] = useState(false);

  const handleShowIng = () => {
    if (showIng) {
      setShowIng(false);
    } else {
      setShowIng(true);
    }
  };

  return (
    <div
      key={getCartItemKey(item)}
      className="bg-white rounded-lg p-2 flex min-h-40 mb-2"
    >
      <div className="flex object-cover w-[30%]">
        <img src={img1} alt="panino" className="w-full" />
      </div>
      <div className=" w-[70%] flex flex-col justify-between">
        <div className=" flex flex-col items-center">
          <h3 className="mr-2 text-lg font-bold">
            {item.name} {item.selectedSize?.label}
          </h3>
          <h4 className="text-xl">
            € {item.selectedSize?.price || item.basePrice}
          </h4>
          <div
            className={`flex flex-col items-centrer w-full p-2 ${showIng ? "" : "collapse"}`}
          >
            <p className="font-semibold">Ingredienti:</p>
            <div>
              {item.selectedIngredients?.map((i) => (
                <p>{i}</p>
              ))}
            </div>
          </div>
          <button onClick={handleShowIng}>Show Ingredients</button>
        </div>
        <div className=" flex items-center justify-around ">
          <h3 className="text-xl font-semibold">
            Total: €{" "}
            {(item.selectedSize?.price || item.basePrice) * item.quantity}
          </h3>
          <button
            onClick={() => {
              const key = getCartItemKey(item);
              dispatch(removeFromCart({ key, quantity: 1 }));
            }}
            className="bg-secondary rounded-full size-10"
          >
            -
          </button>
          <h3 className="text-lg font-semibold">x {item.quantity}</h3>
          <button
            onClick={() =>
              dispatch(
                addToCart({
                  id: item.id,
                  name: item.name,
                  basePrice: item.basePrice,
                  selectedSize: item.selectedSize,
                  selectedIngredients: item.selectedIngredients,
                }),
              )
            }
            className="bg-secondary rounded-full size-10"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
