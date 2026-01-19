import { Document } from "mongoose";

export  interface IExtras extends Document{
    name: string;
    price?: number; 
    allergens?:string[];
    available?: boolean
}
