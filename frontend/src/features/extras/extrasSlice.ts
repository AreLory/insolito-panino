import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AvailableExtra } from "../../types/products";
import API_BASE_URL from "../../config/api";
import { api } from "../../config/axios";

interface ExtrasState {
  data: AvailableExtra[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ExtrasState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchExtras = createAsyncThunk<
  AvailableExtra[],
  void,
  { rejectValue: string }
>("extras/fetch", async (_, thunkAPI) => {
  try {
    const res = await api.get(`${API_BASE_URL}/extras`);
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Network error",
    );
  }
});

const extrasSlice = createSlice({
    name: "extras",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(fetchExtras.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchExtras.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(fetchExtras.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed";
          })
      },
})

export default extrasSlice.reducer