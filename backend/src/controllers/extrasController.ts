import Extras from "../models/extras";
import { IExtras } from "../types/IExtras";
import { Request, Response } from "express";

//Extras List
export const getAllExtras = async (req: Request, res: Response) => {
  try {
    const extras =await Extras.find();
    res.status(200).json(extras);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};
// Get one extra info
export const getExtra = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const extra = await Extras.findById(id);
    res.status(200).json(extra);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

// Create Extra
export const createExtra = async (req: Request, res: Response) => {
  try {
    const { name, price, allergens, available } = req.body;

    const newExtra: IExtras = new Extras({
      name,
      price,
      allergens,
      available,
    });

    await newExtra.save();
    res.status(200).json(newExtra);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

//Delete Extra
export const deleteExtra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const extra = await Extras.findByIdAndDelete(id);
    res.status(204).send("Successfully deleted");
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

//Update Extra
export const updateExtra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const change = req.body;
    const extra = await Extras.findByIdAndUpdate(
      id,
      { $set: change },
      { new: true }
    );

    if (!extra) {
      return res.status(404).json({ error: "Extra not found" });
    }

    res.status(200).json(extra);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
