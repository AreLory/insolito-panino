export interface IOrderItem {
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

export interface IOrder {
  user: string;

  items: IOrderItem[];

  status: "pending" | "confirmed" | "in_preparation" | "ready" | "completed" | "canceled";

  total: number;

  paymentMethod: "cash" | "card" | "online";
  paymentStatus: "unpaid" | "paid" | "refunded";

  orderType: "take_away" | "dine_in" | "delivery";

  notes?: string;
}