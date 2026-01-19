import { Schema, model } from "mongoose";
import { IOrder } from "../types/IOrders";

const OrdersSchema = new Schema<IOrder>({
  date: { type: Date, default: Date.now },
  products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
  user: { type: Schema.Types.ObjectId, ref: "Users" },
});

export default model<IOrder>("Orders", OrdersSchema);
