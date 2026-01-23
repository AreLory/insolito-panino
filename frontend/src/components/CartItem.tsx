import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSelector";
import { addToCart, getCartItemKey, removeFromCart } from "../features/cart/cartSlice";
import { useEffect } from "react";
import type { ICartItem } from "../types/ICartState";

export default function CartItem() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  useEffect(()=>{
  console.log("Cart Items:", cartItems);
},[cartItems])

  return (
    <>
      {cartItems?.map((item: ICartItem) => (
        <div key={getCartItemKey(item)}>
          {item.name} {item.selectedSize?.label}  x  {item.quantity}
          {item.selectedIngredients?.map(i=><p>{i}</p>)}
          <button onClick={() => dispatch(addToCart(item))}className="bg-secondary rounded-full size-10">+</button>
          <button onClick={() => {
            const key = getCartItemKey(item)
            dispatch(removeFromCart({key, quantity: 1}));
          }}className="bg-secondary rounded-full size-10">-</button>
        </div>
      ))}
    </>
  );
}
