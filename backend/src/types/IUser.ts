import { Document } from "mongoose";

export default interface IUser extends Document {
  fullName: string;
  email: string;
  role:string;
  password: string;
  phoneNumber: number;
  address: string;
}
