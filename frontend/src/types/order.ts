export interface OrderItem {
  _id: string;
  name: string;
  unitPrice: number;
  quantity: number;

  selectedSize: {
    label: string;
    price: number;
  } | null;

  removedIngredients: string[];
  extras: { name: string; price: number }[];
}

export interface Order {
  user: string;

  items: OrderItem[];

  status: OrderStatus
  total: number;

  paymentStatus: PaymentStatus
  orderType: OrderType;
  paymentMethod: PaymentMethod;

  notes?: string;
}


export type OrderType = "take_away" | "dine_in" | "delivery";
export type PaymentMethod = "cash" | "card" | "online";
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_preparation"
  | "ready"
  | "completed"
  | "canceled";

export type PaymentStatus = "unpaid" | "paid" | "refunded";

export interface OrderCheckoutState {
  orderType: OrderType;
  paymentMethod: PaymentMethod | null;
  notes: string;
}


export interface CreateOrderDTO {
  items: OrderItem[];
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  notes?: string;
}