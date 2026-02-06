

export  interface IProducts {
    _id: string
    name: string;
    category: 'burger' | 'panino' | 'wrap' | 'fries' | 'fried' | 'arrosticini' | 'vegetarian';
    basePrice: number;           
    sizes?: ISize[];             
    ingredients: IIngredient[];  
    extras: { name: string; price: number }[];  
    imageUrl?: string;           
    available?: boolean;         
    description?: string;        
    quantity?: number;           
}

export interface ISize {
    label: 'small' | 'medium' | 'large' | string;
    price: number;
    meatWeight?: number; 
}

export  interface IIngredient {
    name: string;
    removable?: boolean;
}

