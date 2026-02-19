// src/models/Product.ts
import { Schema, model, Document } from "mongoose";
import { IProduct, IIngredient, ISize } from "../types/IProducts";

export interface IProductDocument extends IProduct, Document {}

const IngredientSchema = new Schema<IIngredient>({
  name: { type: String, required: true },
  removable: { type: Boolean, default: true }
});

const SizeSchema = new Schema<ISize>({
  label: { type: String, required: true },
  price: { type: Number, required: true },
  meatWeight: { type: Number }
});

const ProductsSchema = new Schema<IProductDocument>({
  name: { type: String, required: true },
  category: {type: Schema.Types.ObjectId, ref: 'Categories'},
  basePrice: { type: Number, required: true },
  sizes: [SizeSchema],
  ingredients: { type: [IngredientSchema], required: true },
  extras: [{type: Schema.Types.ObjectId, ref: 'Extras'}],
  imageUrl: { type: String },
  available: { type: Boolean, default: true },
  description: { type: String }
}, { timestamps: true });

export default model<IProductDocument>("Products", ProductsSchema);

