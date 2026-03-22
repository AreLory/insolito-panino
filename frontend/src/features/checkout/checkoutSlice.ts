import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderCheckoutState, OrderType, PaymentMethod } from "../../types/order";

const initialState: OrderCheckoutState = {
    orderType: 'take_away',
    paymentMethod: null,
    notes: "",
}

const orderCheckoutSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

        setOrderType(state, action: PayloadAction<OrderType>){
            state.orderType = action.payload;
        },
        setPaymentMethod(state, action: PayloadAction<PaymentMethod>){
            state.paymentMethod = action.payload;
        },
        setNotes(state, action:PayloadAction<string>){
            state.notes = action.payload;
        },
        resetOrder(){
            return initialState
        }
    }
})


export const {setOrderType, setPaymentMethod, setNotes, resetOrder} = orderCheckoutSlice.actions;

export default orderCheckoutSlice.reducer