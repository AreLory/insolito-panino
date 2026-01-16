import IUser from "../interfaces/IUser";
import User from "../models/user";
import e, { Request, Response } from "express";
import bcrypt from "bcrypt";
// todo: Logout logic
// ! For users: Register, Login, Logut
// ! For admins: getUsers


// Register 
export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, address:{street, number} }:IUser =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser:IUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      address: {
        street,
        number
      },
    });

    await newUser.save();
    res.status(201).send()
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};


// Login
export const userLogin = async (req:Request, res:Response) =>{
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
}

// Logout
export const userLogout = async (req:Request, res:Response) =>{
  try {
    // In a real application, you would handle token invalidation or session destruction here.
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
}


// GET /users/me
export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }   
        res.status(200).json(user);} catch (error) {
        res.status(500).json({ error : error.message || "Server error" });
    }
}


// Get Users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error : error.message || "Server error" });
    }
}
