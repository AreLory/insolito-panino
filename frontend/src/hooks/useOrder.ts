//Hooks
import { useDispatch, useSelector } from "react-redux";

import { setOrderType, setPaymentMethod, setNotes } from "../features/checkout/checkoutSlice";
import { selectFinalTotal, selectOrder } from "../features/checkout/checkoutSelectors";
import type { Order, OrderType, PaymentMethod } from "../types/order";
import { selectCartSubtotal } from "../features/cart/cartSelectors";

export function useOrder(){
    const dispatch = useDispatch();
    const order:Order = useSelector(selectOrder)
    const total: number = useSelector(selectFinalTotal);
    const subtotal:number = useSelector(selectCartSubtotal);

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