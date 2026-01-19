import { Document } from "mongoose";
import { IProduct } from "./IProducts";
import IUser from "./IUser";


export interface IOrder extends Document {
    date: Date,
    products: IProduct[],
    user: IUser
}