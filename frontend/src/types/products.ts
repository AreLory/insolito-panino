export interface Products {
  _id: string;
  name: string;
  category: Category;
  basePrice: number;
  sizes?: Size[];
  ingredients: Ingredient[];
  availableExtras: AvailableExtra[];
  imageUrl: string;
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
  id: string;
  name: string;
  removable?: boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  img: string;
  description: string;
  active: boolean;
}

export interface AvailableExtra {
  _id: string;
  name: string;
  price: number;
  available?: boolean;
}
