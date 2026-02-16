import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/checkout/checkoutSlice'
import activeOrderReducer from '../features/activeOrder/activeOrderSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        order: orderReducer,
        activeOrder: activeOrderReducer
    },
    // devTools: process.env.NODE_ENV !== 'production'
})