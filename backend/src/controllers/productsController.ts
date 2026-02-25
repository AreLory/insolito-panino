import { IProduct } from "../types/IProducts";
import Products from "../models/products";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { asyncHandler } from "../middlewares/errorHandler";

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const category = req.query.category as string | undefined;

    const filter = category
      ? { category: new mongoose.Types.ObjectId(category) }
      : {};

    const products = await Products.find(filter).populate("category");
    res.status(200).json(products);
  },
);

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const prodId = req.params.id;
  const product = await Products.findById(prodId).populate("availableExtras");
  res.status(200).json(product);
});

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      name,
      category,
      basePrice,
      sizes,
      ingredients,
      availableExtras,
      imageUrl,
      available,
      description,
    } = req.body;

    const newProduct: IProduct = new Products({
      name,
      category,
      basePrice,
      sizes,
      ingredients,
      availableExtras,
      imageUrl,
      available,
      description,
    });

    await newProduct.save();
    res.status(200).json(newProduct);
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Products.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send();
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const change = req.body;
    const product = await Products.findByIdAndUpdate(
      id,
      { $set: change },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  },
);