//Hooks
import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../features/cart/cartSelector";
import { getCartItemKey, addToCart, removeFromCart } from "../features/cart/cartSlice";

//interfaces
import type {IProducts, ISize } from "../types/products";
import type { ICartItem } from "../types/cart";




export function useProductCart(
  item: IProducts | null,
  selectedSize: ISize | null,
  removedIngredients: string[]
) {
  const dispatch = useDispatch();
  const cartItems: ICartItem[] = useSelector(selectCartItems);

  if (!item) {
    return { cartItem: null, quantity: 0, addOne: () => {}, removeOne: () => {}, removeAll: () => {} };
  }


  const selectedItem: ICartItem = {
    _id: item._id,
    name: item.name,
    unitPrice: item.basePrice,
    selectedSize: selectedSize
      ? { label: selectedSize.label, price: selectedSize.price }
      : undefined,
    removedIngredients: removedIngredients ?? [],
    quantity: 1,
    extras: item.extras ?? [],
  };

  const cartItem = cartItems.find(
    (i) =>
      i._id === selectedItem._id &&
      i.selectedSize?.label === selectedItem.selectedSize?.label &&
      JSON.stringify(i.removedIngredients) === JSON.stringify(selectedItem.removedIngredients)
  );

  const addOne = () => {
    dispatch(
      addToCart({
        ...selectedItem,
        quantity: 1,
      })
    );
  };

  const removeOne = () => {
    if (!cartItem) return;
    dispatch(
      removeFromCart({
        key: getCartItemKey(cartItem),
        quantity: 1,
      })
    );
  };

  const removeAll = () => {
    if (!cartItem) return;
    dispatch(
      removeFromCart({
        key: getCartItemKey(cartItem),
        quantity: cartItem.quantity,
      })
    );
  };

  return { cartItem, quantity: cartItem?.quantity ?? 0, addOne, removeOne, removeAll };
}