export interface CartItem {
  _id: string;
  name: string;
  unitPrice: number;

  selectedSize: {
    label: string;
    price: number;
  } | null;

  removedIngredients: string[];
  selectedExtras: { _id: string; name: string; price: number }[];
  quantity: number;
  totalItemPrice:number
}

export interface CartState {
  items: CartItem[];
}
