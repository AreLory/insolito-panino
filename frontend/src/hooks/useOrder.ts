//Hooks
import { useDispatch, useSelector } from "react-redux";

import { setOrderType, setPaymentMethod, setNotes } from "../features/checkout/checkoutSlice";
import { selectFinalTotal, selectOrder } from "../features/checkout/checkoutSelectors";
import { selectCartSubtotal } from "../features/cart/cartSelectors";

import type { OrderCheckoutState, OrderType, PaymentMethod } from "../types/order";

export function useOrder(){
    const dispatch = useDispatch();
    const order: OrderCheckoutState = useSelector(selectOrder) as OrderCheckoutState;
    const total: number = useSelector(selectFinalTotal);
    const subtotal: number = useSelector(selectCartSubtotal);

    const changeOrderType = (orderType: OrderType)=>{
        dispatch(setOrderType(orderType))
    }

    const changePaymentMethod = (paymentMethod: PaymentMethod)=>{
        dispatch(setPaymentMethod(paymentMethod))
    }

    const changeNotes = (notes: string)=>{
        dispatch(setNotes(notes))
    }

    return {
        order,
        total,
        subtotal,
        changeOrderType,
        changePaymentMethod,
        changeNotes
    }
}