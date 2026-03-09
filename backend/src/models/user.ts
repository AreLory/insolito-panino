import { Schema, model } from "mongoose";
import type IUser from "../types/IUser";
import z from "zod";

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  phoneNumber: Number,
  address: String,
});

export const createUserSchema = z.object({
  fullName: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
})

export default model<IUser>("User", UserSchema);
