export interface Products {
  _id: string;
  name: string;
  category:
    | "burger"
    | "panino"
    | "wrap"
    | "fries"
    | "fried"
    | "arrosticini"
    | "vegetarian";
  basePrice: number;
  sizes?: Size[];
  ingredients: Ingredient[];
  extras: { name: string; price: number }[];
  imageUrl?: string;
  available?: boolean;
  description?: string;
  quantity?: number;
}

export interface Size {
  label: "small" | "medium" | "large" | string;
  price: number;
  meatWeight?: number;
}

export interface Ingredient {
  name: string;
  removable?: boolean;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  itemCount: number;
  color: string;
}
