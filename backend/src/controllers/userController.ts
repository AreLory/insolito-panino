import IUser from "../types/IUser";
import User from "../models/user";

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT as string;

export const createUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, phoneNumber, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, jwtSecret, { expiresIn: "1h" });

    res.status(201).send({
      message: "Registration successful",
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const userLogout = async (req: Request, res: Response) => {
  res.status(200).json({message: 'Logout successful'});
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const allowedUpdates = ["fullName", "phoneNumber", "address", "password"];
    const change: any = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) change[key] = req.body[key];
    }

    if (change.password) {
      change.password = await bcrypt.hash(change.password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: change },
      { new: true },
    ).select("-password");
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};
