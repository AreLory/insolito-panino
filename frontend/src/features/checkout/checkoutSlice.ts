import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  OrderCheckoutState,
  OrderType,
  PaymentMethod,
} from "../../types/order";

const initialState: OrderCheckoutState = {
  orderType: "take_away",
  paymentMethod: null,
  notes: "",
  requestedTime: (() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    const rounded = Math.ceil(now.getMinutes() / 5) * 5;
    now.setMinutes(rounded, 0, 0);
    return now.toISOString(); // <- qui converti in stringa
  })(),
};

const orderCheckoutSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderType(state, action: PayloadAction<OrderType>) {
      state.orderType = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.paymentMethod = action.payload;
    },
    setNotes(state, action: PayloadAction<string>) {
      state.notes = action.payload;
    },
    setRequestedTime(state, action: PayloadAction<string>) {
      state.requestedTime = action.payload; 
    },
    resetOrder() {
      return initialState;
    },
  },
});

export const {
  setOrderType,
  setPaymentMethod,
  setNotes,
  setRequestedTime,
  resetOrder,
} = orderCheckoutSlice.actions;

export default orderCheckoutSlice.reducer;
