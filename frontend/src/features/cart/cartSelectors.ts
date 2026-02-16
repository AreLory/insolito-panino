import { createSelector } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/cart";

export const selectCartItems = (state: any) => {
  if (!state?.cart?.items) return [];
  return state.cart.items;
};

export const selectCartSubtotal = createSelector([selectCartItems], (items) => {
  return items.reduce((acc, item) => {
    const sizePrice = item.selectedSize?.price ?? 0;
    const extrasPrice = item.extras.reduce((eAcc, e) => eAcc + e.price, 0);
    return acc + (( sizePrice || item.unitPrice ) + extrasPrice) * item.quantity;
  }, 0);
});

export const selectTotalItems = createSelector([selectCartItems], (cart) =>
  cart.reduce(
    (total: number, item: CartItem) => total + (item.quantity ?? 1),
    0,
  ),
);
