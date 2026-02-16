import { Document } from "mongoose";

export  interface IExtras extends Document{
    name: string;
    price?: number; 
    available?: boolean
}
