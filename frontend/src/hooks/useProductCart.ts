import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../features/cart/cartSelectors";
import {
  getCartItemKey,
  addToCart,
  removeFromCart,
} from "../features/cart/cartSlice";

import type { AvailableExtra, Products, Size } from "../types/products";
import type { CartItem } from "../types/cart";

export function useProductCart(
  item: Products | null,
  selectedSize: Size | null,
  removedIngredients: string[],
  selectedExtras: string[] = [], 
) {
  const dispatch = useDispatch();
  const cartItems: CartItem[] = useSelector(selectCartItems);

  if (!item) {
    return {
      cartItem: null,
      quantity: 0,
      addOne: () => {},
      removeOne: () => {},
      removeAll: () => {},
    };
  }

  const selectedExtrasArray = (selectedExtras ?? []).map((id) => {
    const found = (item.availableExtras || []).find((ae: AvailableExtra) => ae._id === id);
    if (found) return { _id: found._id, name: found.name, price: found.price };
    return { _id: id, name: "", price: 0 };
  });

  const unit = selectedSize ? selectedSize.price : item.basePrice;

  const totalItemPrice = unit + (selectedExtrasArray.reduce((s, e) => s + (e.price || 0), 0) || 0);

  const selectedItem: CartItem = {
    _id: item._id,
    name: item.name,
    unitPrice: item.basePrice,
    selectedSize: selectedSize ? { label: selectedSize.label, price: selectedSize.price } : null,
    removedIngredients: removedIngredients ?? [],
    selectedExtras: selectedExtrasArray,
    quantity: 1,
    totalItemPrice,
  };

  //Check if selectedItem is already in cart 
  const cartItem = cartItems.find((i) => {
    const extrasIds = (i.selectedExtras || [])
      .map((e: any) => (typeof e === "string" ? e : e._id))
      .sort();

    const selectedExtrasSorted = (selectedItem.selectedExtras || [])
      .map((e: any) => (typeof e === "string" ? e : e._id))
      .sort();

    return (
      i._id === selectedItem._id &&
      i.selectedSize?.label === selectedItem.selectedSize?.label &&
      JSON.stringify(i.removedIngredients) ===
        JSON.stringify(selectedItem.removedIngredients) &&
      JSON.stringify(extrasIds) === JSON.stringify(selectedExtrasSorted)
    );
  });

  const addOne = () => {
    dispatch(
      addToCart({
        ...selectedItem,
        quantity: 1,
      }),
    );
  };

  const removeOne = () => {
    if (!cartItem) return;
    dispatch(
      removeFromCart({
        key: getCartItemKey(cartItem),
        quantity: 1,
      }),
    );
  };

  const removeAll = () => {
    if (!cartItem) return;
    dispatch(
      removeFromCart({
        key: getCartItemKey(cartItem),
        quantity: cartItem.quantity,
      }),
    );
  };

  return {
    cartItem,
    quantity: cartItem?.quantity ?? 0,
    addOne,
    removeOne,
    removeAll,
  };
}
