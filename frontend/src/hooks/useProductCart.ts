//Hooks
import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../features/cart/cartSelector";
import { getCartItemKey, addToCart, removeFromCart } from "../features/cart/cartSlice";

//interfaces
import type {IProducts, ISize } from "../types/products";



export function useProductCart(
  item: IProducts | null,
  selectedSize: ISize | null,
  selectedIngredients: string[]
) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  if (!item) {
    return { cartItem: null, quantity: 0, addOne: () => {}, removeOne: () => {} };
  }

  const selectedItem = {
    id: item.id,
    name: item.name,
    basePrice: item.basePrice,
    selectedSize,
    selectedIngredients,
  };

  const cartItem = cartItems.find(
    (i) => getCartItemKey(i) === getCartItemKey(selectedItem)
  );

  const addOne = () => {
    dispatch(
      addToCart({
        ...item,
        selectedSize: selectedSize || undefined,
        selectedIngredients,
        quantity: 1,
      })
    );
  };

  const removeOne = () => {
    if (!cartItem) return;
    const key = getCartItemKey(cartItem);
    dispatch(removeFromCart({ key, quantity: 1 }));
  };

  const removeAll = ()=>{
    if(!cartItem)return;
    const key = getCartItemKey(cartItem)
    dispatch(removeFromCart({key:key, quantity: cartItem.quantity}))
  }

  return { cartItem, quantity: cartItem?.quantity ?? 0, addOne, removeOne, removeAll };
}
