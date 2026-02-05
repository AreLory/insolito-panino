import { createSelector } from "@reduxjs/toolkit";
import type { ICartItem } from "../../types/cart";

export const selectCartItems = (state:any) => {
    if (!state?.cart?.items) return [];
    return state.cart.items;
}

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce((total:number, item:ICartItem) => {
      const price =
        item.selectedSize?.price ?? item.basePrice;
      return total + price * item.quantity;
    }, 0)
);

export const selectTotalItems = createSelector(
  [selectCartItems],
  (cart) =>
    cart.reduce((total:number, item:ICartItem) => total + (item.quantity ?? 1), 0)
);