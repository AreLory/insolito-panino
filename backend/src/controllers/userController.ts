import IUser from "../interfaces/IUser";
import User from "../models/user";
import { Request, Response } from "express";


// Create User 
export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, address:{street, number} }:IUser =
      req.body;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address: {
        street,
        number
      },
    });

    await newUser.save();
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};


// Login
export const userLogin = async (req:Request, res:Response) =>{

}