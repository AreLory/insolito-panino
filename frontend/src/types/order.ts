import type { ICartState } from "./cart";

export interface IOrder{
    user: any,
    items: ICartState
    status:string,
    subtotal:number,
    total:number,
    paymentMethod:string,
    paymentStatus:string,
    orderType:string,
    notes:string
}