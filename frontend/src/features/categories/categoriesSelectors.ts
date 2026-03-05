import type { RootState } from "../../store/store";

export const selectCategories = (state: RootState) =>
  state.categories?.data;

export const selectCategoriesLoading = (state: RootState) =>
  state.categories?.loading || false;

export const selectCategoriesError = (state: RootState) =>
  state.categories?.error || null;
