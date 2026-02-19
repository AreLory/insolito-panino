import { Document } from "mongoose";

export interface ICategories extends Document {
  name: string;
  slug:string;
  emoji: string;
  img: string;
  description?: string;
  active?:boolean;
}
