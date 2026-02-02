
import type { ICartItem } from "../types/ICartState";
import { selectCartItems } from "../features/cart/cartSelector";
import { useSelector } from "react-redux";
import CartItemCard from "./CartItemCard";

export default function CartItem() {
 const cartItems = useSelector(selectCartItems);
  return (
    <>
      {cartItems?.map((item: ICartItem) => (
       <CartItemCard item={item}/>
      ))}
    </>
  );
}
