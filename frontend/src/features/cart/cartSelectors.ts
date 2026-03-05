import { createSelector } from "@reduxjs/toolkit";
import type { CartItem } from "../../types/cart";
import type { RootState } from "../../store/store";

export const selectCartItems = (state: RootState) => {
  if (!state?.cart?.items) return [];
  return state.cart.items;
};

export const selectCartSubtotal = createSelector([selectCartItems], (items) => {
  return items.reduce((acc, item) => {
    const sizePrice = item.selectedSize?.price ?? 0;
    const extrasPrice = item.selectedExtras.reduce((eAcc, e) => eAcc + e.price, 0);
    return acc + (( sizePrice || item.unitPrice ) + extrasPrice) * item.quantity;
  }, 0);
});

export const selectTotalItems = createSelector([selectCartItems], (cart) =>
  cart.reduce(
    (total: number, item: CartItem) => total + (item.quantity ?? 1),
    0,
  ),
);
