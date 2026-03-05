import { asyncHandler } from "../middlewares/errorHandler";
import Extras from "../models/extras";
import { IExtras } from "../types/IExtras";
import { Request, Response } from "express";

export const getAllExtras = asyncHandler(
  async (req: Request, res: Response) => {
    const extras = await Extras.find();
    res.status(200).json(extras);
  },
);

export const getExtra = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const extra = await Extras.findById(id);
  res.status(200).json(extra);
});

export const createExtra = asyncHandler(async (req: Request, res: Response) => {
  const { name, price, available } = req.body;

  const newExtra: IExtras = new Extras({
    name,
    price,
    available,
  });

  await newExtra.save();
  res.status(201).json(newExtra);
});

export const deleteExtra = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const extra = await Extras.findByIdAndDelete(id);
  res.status(204).send("Successfully deleted");
});

export const updateExtra = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const change = req.body;
  const extra = await Extras.findByIdAndUpdate(
    id,
    { $set: change },
    { new: true },
  );

  if (!extra) {
    return res.status(404).json({ error: "Extra not found" });
  }

  res.status(200).json(extra);
});