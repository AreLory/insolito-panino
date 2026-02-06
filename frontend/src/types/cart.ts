export interface ICartItem {
  _id: string;
  name: string;
  unitPrice: number;

  selectedSize: {
    label: string;
    price: number;
  } | null;

  removedIngredients: string[];
  extras: { name: string; price: number }[];
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
}