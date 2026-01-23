import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/cartSelector";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import type { IProducts } from "../types/IProducts";

export default function CartItem() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  return (
    <>
      {cartItems.map((item: IProducts) => (
        <div key={item.id}>
          {item.name}  x  {item.quantity}
          <button onClick={() => dispatch(addToCart(item))}className="bg-secondary rounded-full size-10">+</button>
          <button onClick={() => dispatch(removeFromCart(item.id))}className="bg-secondary rounded-full size-10">-</button>
        </div>
      ))}
    </>
  );
}
