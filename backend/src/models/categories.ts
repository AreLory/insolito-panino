import { Schema, model } from "mongoose";
import { ICategories } from "../types/ICategories";

const CategoriesSchema = new Schema<ICategories>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  emoji: { type: String},
  img: {type:String},
  description: { type: String },
  active: { type: Boolean },
});

export default model<ICategories>('Categories', CategoriesSchema)