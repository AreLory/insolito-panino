import type { Category } from "../../types/products";

// import type { RootState } from "@reduxjs/toolkit/query";
export const selectCategories = (state: any): Category[] =>
  state.categories?.data;

export const selectCategoriesLoading = (state: any) =>
  state.categories?.loading || false;

export const selectCategoriesError = (state: any) =>
  state.categories?.error || null;
