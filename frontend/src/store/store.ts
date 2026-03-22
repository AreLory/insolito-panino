import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";
import orderCheckoutSlice from "../features/checkout/checkoutSlice";
import activeOrderReducer from "../features/activeOrder/activeOrderSlice";

import categoriesReducer from "../features/categories/categoriesSlice";
import productReducer from "../features/products/productsSlice";
import extrasReducer from "../features/extras/extrasSlice";
import orderReducer from '../features/orders/ordersSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderCheckoutSlice,
    activeOrder: activeOrderReducer,
    categories: categoriesReducer,
    products: productReducer,
    extras: extrasReducer,
    orders: orderReducer,
  },
  // devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
