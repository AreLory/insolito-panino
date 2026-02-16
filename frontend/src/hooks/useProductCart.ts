//Hooks
import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../features/cart/cartSelectors";
import { getCartItemKey, addToCart, removeFromCart } from "../features/cart/cartSlice";

//interfaces
import type {Products, Size } from "../types/products";
import type { CartItem } from "../types/cart";




export function useProductCart(
  item: Products | null,
  selectedSize: Size | null,
  removedIngredients: string[]
) {
  const dispatch = useDispatch();
  const cartItems: CartItem[] = useSelector(selectCartItems);

  if (!item) {
    return { cartItem: null, quantity: 0, addOne: () => {}, removeOne: () => {}, removeAll: () => {} };
  }


  const selectedItem: CartItem = {
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