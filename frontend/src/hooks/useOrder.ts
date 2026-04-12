//Hooks
import { useDispatch, useSelector } from "react-redux";

import {
  setOrderType,
  setPaymentMethod,
  setNotes,
  setRequestedTime,
} from "../features/checkout/checkoutSlice";
import {
  selectFinalTotal,
  selectOrder,
} from "../features/checkout/checkoutSelectors";
import { selectCartSubtotal } from "../features/cart/cartSelectors";

import type { Order, OrderType, PaymentMethod } from "../types/order";

export function useOrder() {
  const dispatch = useDispatch();
  const order: Order = useSelector(selectOrder);
  const total: number = useSelector(selectFinalTotal);
  const subtotal: number = useSelector(selectCartSubtotal);

  const getInitialTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);

    const min = new Date();
    min.setHours(18, 30, 0, 0);

    const max = new Date();
    max.setHours(22, 0, 0, 0);

    if (now < min) return min;
    if (now > max) return max;

    return now;
  };

  const requestedTimeDate = order.requestedTime
    ? new Date(order.requestedTime)
    : getInitialTime();

  const changeOrderType = (orderType: OrderType) => {
    dispatch(setOrderType(orderType));
  };

  const changePaymentMethod = (paymentMethod: PaymentMethod) => {
    dispatch(setPaymentMethod(paymentMethod));
  };

  const changeNotes = (notes: string) => {
    dispatch(setNotes(notes));
  };

  const changeRequestedTime = (date: Date) => {
    dispatch(setRequestedTime(date.toISOString()));
  };

  return {
    order,
    total,
    subtotal,
    changeOrderType,
    changePaymentMethod,
    changeNotes,
    changeRequestedTime,
    requestedTimeDate,
  };
}
