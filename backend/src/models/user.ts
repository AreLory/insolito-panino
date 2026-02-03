import { Schema, model } from "mongoose";
import type IUser from "../types/IUser";

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: Number,
  address: String,
});

export default model<IUser>("User", UserSchema);
