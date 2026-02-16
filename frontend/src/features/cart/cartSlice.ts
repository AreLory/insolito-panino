import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "../../types/cart";

export const getCartItemKey = (item: CartItem) =>
  `${item._id}-${item.selectedSize?.label || ""}-${(
    item.removedIngredients || []
  )
    .slice()
    .sort()
    .join(",")}`;

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;

      const key = getCartItemKey(newItem);

      const existingItem = state.items.find(
        (item) => getCartItemKey(item) === key,
      );

      if (existingItem?.quantity) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
    },

    removeFromCart(
      state,
      action: PayloadAction<{ key: string; quantity?: number }>,
    ) {
      const { key, quantity } = action.payload;

      const index = state.items.findIndex(
        (item) => getCartItemKey(item) === key,
      );

      if (index === -1) return;

      if (quantity && state.items[index].quantity > quantity) {
        state.items[index].quantity -= quantity;
      } else {
        state.items.splice(index, 1);
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
