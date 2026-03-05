import type { Order } from "../../types/order";
import type { RootState } from "../../store/store";

export const selectActiveOrder = (state: RootState): Order | null =>
  state.activeOrder.data;

export const selectActiveOrderLoading = (state: RootState) =>
  state.activeOrder.loading;

export const selectActiveOrderError = (state: RootState) =>
  state.activeOrder.error;