import IUser from "../types/IUser";
import User from "../models/user";
import { asyncHandler } from "../middlewares/errorHandler";

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT as string;

export const createUser = asyncHandler(async (req: Request, res: Response) => {
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
  const token = jwt.sign({ id: newUser._id, email: newUser.email }, jwtSecret, {
    expiresIn: "1h",
  });

  res.status(201).send({
    message: "Registration successful",
    token,
  });
});

export const userLogin = asyncHandler(async (req: Request, res: Response) => {
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
});

export const userLogout = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Logout successful" });
};

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  },
);

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
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
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
});