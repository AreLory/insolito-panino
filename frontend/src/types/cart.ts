export interface ICartItem {
  id: string;                // id prodotto
  name: string;
  basePrice: number;
  selectedSize?: { label: string; price: number };
  selectedIngredients?: string[];
  quantity?:number
}

export interface ICartState {
  items: ICartItem[];
}