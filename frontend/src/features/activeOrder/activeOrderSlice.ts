import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Order } from "../../types/order";
import API_BASE_URL from "../../config/api";
import { api } from "../../config/axios";

interface ActiveOrderState {
  data: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: ActiveOrderState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchActiveOrder = createAsyncThunk<
  Order | null,
  void,
  { rejectValue: string }
>("activeOrder/fetch", async (_, thunkAPI) => {
  try {
    const res = await api.get(`${API_BASE_URL}/orders/active`);
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Network error",
    );
  }
});

const activeOrderSlice = createSlice({
  name: "activeOrder",
  initialState,
  reducers: {
    clearActiveOrder(state) {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchActiveOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { clearActiveOrder } = activeOrderSlice.actions;

export default activeOrderSlice.reducer;
