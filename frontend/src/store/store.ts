import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/checkout/checkoutSlice'
import activeOrderReducer from '../features/activeOrder/activeOrderSlice'
import categoriesReducer from '../features/categories/categoriesSlice'
import productReducer from '../features/products/productsSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        order: orderReducer,
        activeOrder: activeOrderReducer,
        categories: categoriesReducer,
        products: productReducer
    },
    // devTools: process.env.NODE_ENV !== 'production'
})