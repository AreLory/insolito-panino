import type { IProducts } from "../../types/IProducts";


export const selectCartItems = (state:any) => {
    if (!state?.cart?.items) return [];
    return state.cart.items;
}