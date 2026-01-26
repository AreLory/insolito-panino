import { Document, Types } from "mongoose";

export  interface IProduct extends Document {
    name: string;
    category: string[]
    basePrice: number;           
    sizes?: ISize[];             
    ingredients: IIngredient[];  
    extras?: Types.ObjectId[] ;          
    imageUrl?: string;           
    available?: boolean;         
    description?: string;        
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
