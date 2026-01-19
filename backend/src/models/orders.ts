import { Schema, Types, model } from "mongoose";
import { IOrder, IOrderItem } from "../types/IOrders";

const OrderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: "Products" },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },

  options: [{ type: String }],
});

const OrdersSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    items: {type: [OrderItemSchema],validate: v => v.length > 0 },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "in_preparation",
        "ready",
        "completed",
        "canceled",
      ],
    },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },

    paymentMethod: {
      type: String,
      enum: ["cash", "card", "online"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      required: true,
    },
    orderType: {
      type: String,
      enum: ["take_away", "dine_in", "delivery"],
      required: true,
    },
    notes: {type:String}
  },
  { timestamps: true },
);

export default model<IOrder>("Orders", OrdersSchema);
