import { Document } from "mongoose";
import { IProduct } from "./IProducts";
import IUser from "./IUser";


export interface IOrder extends Document {
  created: Date;

  user: IUser;

  items: IOrderItem[];

  status: OrderStatus;

  subtotal: number;
  total: number;

  paymentMethod: PaymentMethod;

  paymentStatus: PaymentStatus;

  orderType: OrderType; 
  notes:String;
}

export interface IOrderItem {
  product: IProduct;
  name: string;
  price: number;
  quantity: number;

  options?: string[];
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  IN_PREPARATION = "in_preparation",
  READY = "ready",
  COMPLETED = "completed",
  CANCELED = "canceled"
}

export enum PaymentMethod {
  CASH = "cash",
  CARD = "card",
  ONLINE = "online"
}

export enum PaymentStatus {
  UNPAID = "unpaid",
  PAID = "paid",
  REFUNDED = "refunded"
}

export enum OrderType {
  TAKE_AWAY = "take_away",
  DINE_IN = "dine_in",
  DELIVERY = "delivery"
}
