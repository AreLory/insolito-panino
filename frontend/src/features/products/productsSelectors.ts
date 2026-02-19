import type { Products } from "../../types/products";

export const selectProducts = (state: any): Products[] | null =>
    state.products.data;

export const selectProductsLoading = (state: any) =>
    state.products.loading;

export const selectProductsError = (state: any) =>
    state.products.error;