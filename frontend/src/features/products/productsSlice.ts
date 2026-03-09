import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Products } from "../../types/products";
import API_BASE_URL from "../../config/api";
import { api } from "../../config/axios";

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

export const fetchProducts = createAsyncThunk<
  Products[],
  void,
  { rejectValue: string }
>("products/fetch", async (_, thunkAPI) => {
  try {
    const res = await api.get(`${API_BASE_URL}/products`);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Network error",
    );
  }
});

export const deleteProduct = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("products/delete", async (id, thunkAPI) => {
  try {
    await api.delete(`${API_BASE_URL}/products/${id}`);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Delete failed",
    );
  }
});

export const updateProduct = createAsyncThunk<
  Products,
  { id: string; data: Partial<Products> },
  { rejectValue: string }
>("products/update", async ({ id, data }, thunkAPI) => {
  try {
    const res = await api.patch(`${API_BASE_URL}/products/${id}`, data);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Update failed",
    );
  }
});

export const createProduct = createAsyncThunk<
  Products,
  Partial<Products>,
  { rejectValue: string }
>("products/create", async (data, thunkAPI) => {
  try {
    const res = await api.post(`${API_BASE_URL}/products`, data);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Create failed",
    );
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (state.data) {
          state.data = state.data.filter((p) => p._id !== action.payload);
        }
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (state.data) {
          state.data.push(action.payload);
        }
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (state.data) {
          const index = state.data.findIndex(
            (p) => p._id === action.payload._id,
          );
          if (index !== -1) {
            state.data[index] = action.payload;
          }
        }
      });
  },
});

export default productsSlice.reducer;
