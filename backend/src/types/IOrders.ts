import { Document, Types } from "mongoose";
import { IProduct } from "./IProducts";
import IUser from "./IUser";
import { IExtras } from "./IExtras";

export interface IOrder extends Document {
  user: Types.ObjectId | IUser;

  items: IOrderItem[];

  status: OrderStatus;
  subtotal: number;
  total: number;

  requestedTime: Date;
  confirmedTime: Date;

  prepTimeMinutes: number;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  orderType: OrderType;
  notes?: string;
}

export interface IOrderItem {
  product: Types.ObjectId | IProduct;

  name: string;

  unitPrice: number;
  itemTotal: number;

  quantity: number;

  selectedSize: {
    label: string;
    price?: number;
  } | null;

  removedIngredients: string[];

  selectedExtras: {
    extraId: Types.ObjectId;
    name: string;
    price: number;
  }[];
}

export enum OrderStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  IN_PREPARATION = "in_preparation",
  READY = "ready",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export enum PaymentMethod {
  CASH = "cash",
  CARD = "card",
  ONLINE = "online",
}

export enum PaymentStatus {
  UNPAID = "unpaid",
  PAID = "paid",
  REFUNDED = "refunded",
}

export enum OrderType {
  TAKE_AWAY = "take_away",
  DINE_IN = "dine_in",
  DELIVERY = "delivery",
}

export interface CreateOrderBody {
  items: {
    productId: string;
    quantity: number;
    selectedSize?: { label: string };
    removedIngredients?: string[];
    selectedExtras?: IExtras[];
  }[];
  paymentMethod: PaymentMethod;
  orderType: OrderType;
  requestedTime:Date;
  notes?: string;
}
