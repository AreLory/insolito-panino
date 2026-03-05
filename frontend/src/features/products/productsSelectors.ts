import type { Products } from "../../types/products";
import type { RootState } from "../../store/store";

export const selectProducts = (state: RootState): Products[] | null =>
    state.products.data;

export const selectProductsLoading = (state: RootState) =>
    state.products.loading;

export const selectProductsError = (state: RootState) =>
    state.products.error;