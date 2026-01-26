import type { ICartState } from "./ICartState";

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