import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {Products} from "../../types/products";
import API_BASE_URL from "../../config/api";
import {api} from '../../config/axios'

interface ProductsState {
  data: Products[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Products[], void, { rejectValue: string }>(
  "products/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get(`${API_BASE_URL}/products`);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Network error");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload || "Failed"; });
  },
});

export default productsSlice.reducer;