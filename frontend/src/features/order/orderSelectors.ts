import { createSelector } from "@reduxjs/toolkit";
import { selectCartSubtotal } from "../cart/cartSelectors";

export const selectOrderType = (state: any) => {
  if (!state?.order?.orderType) return [];
  return state?.order?.orderType
};

export const selectFinalTotal = createSelector([
    selectCartSubtotal,
    selectOrderType
], (subtotal, orderType)=>{
    if (orderType === 'delivery'){
        return subtotal + 2.5
    }

    return subtotal;
})
