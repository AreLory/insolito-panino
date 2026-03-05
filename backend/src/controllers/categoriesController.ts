import { asyncHandler } from "../middlewares/errorHandler";
import Categories from "../models/categories";
import { ICategories } from "../types/ICategories";
import { Request, Response } from "express";

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await Categories.find();
    res.status(200).json(categories);
  },
);

export const createCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, slug, emoji, img, description, active } = req.body;

    const newCategories: ICategories = new Categories({
      name,
      slug,
      emoji,
      img,
      description,
      active,
    });

    await newCategories.save();
    res.status(201).json(newCategories);
  },
);

export const deleteCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const categories = await Categories.findByIdAndDelete(id);
    res.status(204).send("Successfully deleted");
  },
);

export const updateCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const change = req.body;
    const categories = await Categories.findByIdAndUpdate(
      id,
      { $set: change },
      { new: true },
    );

    if (!categories) {
      return res.status(404).json({ error: "Extra not found" });
    }

    res.status(200).json(categories);
  },
);