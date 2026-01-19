import { Schema, model } from "mongoose";
import { IExtras } from "../types/IExtras";


const ExtrasSchema = new Schema<IExtras>({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  allergens: {type: Array, default: []},
  available: {type: Boolean, default: true},
});

export default model<IExtras>("Extras", ExtrasSchema)