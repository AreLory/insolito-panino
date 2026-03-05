import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Category } from "../../types/products";
import API_BASE_URL from "../../config/api";
import {api} from '../../config/axios'

interface CategoryState {
    data: Category[] | null,
    loading: boolean,
    error: string | null
}

const initialState: CategoryState = {
    data: null,
    loading: false,
    error: null
}

export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
  "categories/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get(`${API_BASE_URL}/categories`);
      return res.data;
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Network error"
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      });
  },
});



export default categoriesSlice.reducer