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
  availableExtras: AvailableExtra[];
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
  _id: string;
  name: string;
  slug: string;
  emoji: string;
  img: string;
  description: string;
  active: boolean;
}

export interface AvailableExtra {
  _id: string;
  name: string;
  price: number;
  available?: true;
}
