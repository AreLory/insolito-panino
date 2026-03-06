import { Schema, model } from "mongoose";
import { IOrder, IOrderItem } from "../types/IOrders";

const OrderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
    name: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    itemTotal: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    selectedSize: { type: { label: { type: String }, price: { type: Number } }, default: undefined },
    removedIngredients: { type: [String], default: [] },
    selectedExtras: [
      {
        extraId: { type: Schema.Types.ObjectId, ref: "Extras" },
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { _id: false }
);

const OrdersSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, enum: ["pending", "confirmed", "in_preparation", "ready", "completed", "canceled"], default: "pending", required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["cash", "card", "online"], required: true },
    paymentStatus: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid", required: true },
    orderType: { type: String, enum: ["take_away", "dine_in", "delivery"], required: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default model<IOrder>("Orders", OrdersSchema);
