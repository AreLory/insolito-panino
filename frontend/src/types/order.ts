import type User from "./profile";

export interface OrderItem {
  product: string;
  quantity: number;
  name: string;
  unitPrice: number;

  selectedSize: {
    label: string;
    price: number;
  } | null;

  removedIngredients: string[];
  selectedExtras: { extraId: string; name: string; price: number }[];
}

export interface Order {
  _id: string;
  user: User;

  items: OrderItem[];

  status: OrderStatus;
  subtotal: number;
  total: number;

  requestedTime:string;
  confirmedTime:string;

  prepTimeMinutes: number;

  paymentStatus: PaymentStatus;
  orderType: OrderType;
  paymentMethod: PaymentMethod;

  notes?: string;

  createdAt: string;
  updatedAt: string;
  // ! string from db, not Date
}

export type OrderType = "take_away" | "dine_in" | "delivery";
export type PaymentMethod = "cash" | "card" | "online";
export type OrderStatus =
  | "pending"
  | "accepted"
  | "in_preparation"
  | "ready"
  | "completed"
  | "canceled";

export type PaymentStatus = "unpaid" | "paid" | "refunded";

export interface OrderCheckoutState {
  orderType: OrderType;
  paymentMethod: PaymentMethod | null;
  notes: string;
  requestedTime: string | null;
}

export interface CreateOrderDTO {
  items: OrderItem[];
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  notes?: string;
  requestedTime: string;
}
