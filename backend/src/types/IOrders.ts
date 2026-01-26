import { Document, Types } from "mongoose";
import { IProduct } from "./IProducts";
import IUser from "./IUser";


export interface IOrder extends Document {
  user: Types.ObjectId | IUser;

  items: IOrderItem[];

  status: OrderStatus;

  total: number;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  orderType: OrderType;
  notes?: string;

}

export interface IOrderItem {
  product: Types.ObjectId | IProduct;

  name: string;

  size: {
    label: string;
    meatWeight?: number;
  };

  price: number;
  quantity: number;

  removedIngredients?: string[];
  extras?: {
    name: string;
    price: number;
  }[];
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
