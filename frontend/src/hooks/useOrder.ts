//Hooks
import { useDispatch, useSelector } from "react-redux";

import { setOrderType, setPaymentMethod, setNotes } from "../features/checkout/checkoutSlice";
import { selectFinalTotal, selectOrder } from "../features/checkout/checkoutSelectors";
import type { OrderType, PaymentMethod } from "../types/order";

export function useOrder(){
    const dispatch = useDispatch();
    const order = useSelector(selectOrder)
    const total: number = useSelector(selectFinalTotal);

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
        changeOrderType,
        changePaymentMethod,
        changeNotes
    }
}