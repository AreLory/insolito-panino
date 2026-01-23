import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartState } from "../../types/ICartState";
import type { IProducts } from "../../types/IProducts";

const initialState: ICartState = {
  products: [],
  quantityById: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProducts>) => {
      const product = action.payload;

      if (!state.quantityById[product.id]) {
        state.products.push(product);
        state.quantityById[product.id] = 1;
      } else {
        state.quantityById[product.id]++;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;

      if (!state.quantityById[productId]) return;

      state.quantityById[productId]--;
      
      if (state.quantityById[productId] === 0) {
        delete state.quantityById[productId];
        state.products = state.products.filter((p) => p.id !== productId);
      }
    },
    clearCart: () => {return initialState;},
  },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions

export default cartSlice.reducer
