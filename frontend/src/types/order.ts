export interface OrderItem {
  _id: string;
  quantity: number;
  name:string;
  unitPrice:number;


  selectedSize: {
    label: string;
    price: number;
  } | null;

  removedIngredients: string[];
  selectedExtras: { _id:string, name: string; price: number }[];
}

export interface Order {
  _id: string;
  user: string;

  items: OrderItem[];

  status: OrderStatus
  subtotal: number
  total: number;

  paymentStatus: PaymentStatus
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