import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API_BASE_URL from "../../config/api";
import { api } from "../../config/axios";

import type { Order } from "../../types/order";

interface OrdersState {
  data: Order[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("orders/fetch", async (_, thunkAPI) => {
  try {
    const res = await api.get(`${API_BASE_URL}/orders`);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Network error",
    );
  }
});

export const deleteOrder = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("orders/delete", async (id, thunkAPI) => {
  try {
    await api.delete(`${API_BASE_URL}/orders/${id}`);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Delete failed",
    );
  }
});

export const updateOrder = createAsyncThunk<
  Order,
  { id: string; data: Partial<Order> },
  { rejectValue: string }
>("orders/update", async ({ id, data }, thunkAPI) => {
  try {
    const res = await api.patch(`${API_BASE_URL}/orders/${id}`, data);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Update failed",
    );
  }
});

const OrdersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    orderAddedRealtime: (state, action) => {
      if (state.data) {
        state.data.unshift(action.payload);
      }
    },

    orderUpdatedRealtime: (state, action) => {
      if (state.data) {
        const index = state.data.findIndex((o) => o._id === action.payload._id);

        if (index !== -1) {
          state.data[index] = action.payload;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        if (state.data) {
          state.data = state.data.filter((p) => p._id !== action.payload);
        }
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
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

export const { orderAddedRealtime, orderUpdatedRealtime } = OrdersSlice.actions;

export default OrdersSlice.reducer;
