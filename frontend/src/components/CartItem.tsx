import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSelector";
import {
  addToCart,
  getCartItemKey,
  removeFromCart,
} from "../features/cart/cartSlice";
import type { ICartItem } from "../types/ICartState";

export default function CartItem() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  return (
    <>
      {cartItems?.map((item:ICartItem) => (
        <div key={getCartItemKey(item)} className="bg-white rounded-lg p-2">
          <div className="flex">
            <h3 className="mr-2 text-xl">
              {item.name} {item.selectedSize?.label}
            </h3>
            <h4 className="text-xl">
              € {item.selectedSize?.price || item.basePrice}
            </h4>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg">Ingredienti:</p>
            {item.selectedIngredients?.map((i) => (
              <p>{i}</p>
            ))}
          </div>
          <div className="flex items-center justify-around">
            <button
              onClick={() => {
                const key = getCartItemKey(item);
                dispatch(removeFromCart({ key, quantity: 1 }));
              }}
              className="bg-secondary rounded-full size-10"
            >
              -
            </button>
            <h3>x {item.quantity}</h3>
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
          <h3 className="text-xl">
            Total: € {(item.selectedSize?.price || item.basePrice) * item.quantity}
          </h3>
        </div>
      ))}
    </>
  );
}
