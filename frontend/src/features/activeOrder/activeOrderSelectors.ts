import type { Order } from "../../types/order";

export const selectActiveOrder = (state: any): Order | null =>
  state.activeOrder.data;

export const selectActiveOrderLoading = (state: any) =>
  state.activeOrder.loading;

export const selectActiveOrderError = (state: any) =>
  state.activeOrder.error;