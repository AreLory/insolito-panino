import mongoose, {Schema} from "mongoose";
import type IUser from "../interfaces/IUser"

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: Number,
  address: {
    street: String,
    number: Number,
  },
});

export default mongoose.model<IUser>('User', UserSchema)