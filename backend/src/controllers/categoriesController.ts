import Categories from "../models/categories";
import { ICategories } from "../types/ICategories";
import { Request, Response } from "express";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const extras = await Categories.find();
    res.status(200).json(extras);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const createCategories = async (req: Request, res: Response) => {
  try {
    const { name, slug, emoji, img, description, active} = req.body;

    const newCategories: ICategories = new Categories({
      name,
      slug,
      emoji,
      img,
      description,
      active,
    });

    await newCategories.save();
    res.status(200).json(newCategories);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const deleteCategories = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categories = await Categories.findByIdAndDelete(id);
    res.status(204).send("Successfully deleted");
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const updateCategories = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
