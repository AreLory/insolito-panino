import { IProduct } from "../types/IProducts";
import Products from "../models/products";
import { Request, Response } from "express";

//Products List
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};
//Get Product Info
export const getProduct = async (req: Request, res: Response) => {
  try {
    const prodId = req.params.id;
    const product = await Products.findById(prodId).populate('extras');
    res.status(200).json(product);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

// ! Admin only
//Create Product 
export const createProduct = async (req: Request, res: Response) => {
    try {
       const {
        name, 
        category,
        basePrice,
        sizes,
        ingredients,
        extras,
        imageUrl,
        available,
        description
       } = req.body


       const newProduct:IProduct = new Products ({
        name, 
        category,
        basePrice,
        sizes,
        ingredients,
        extras,
        imageUrl,
        available,
        description
       })

       await newProduct.save()
       res.status(200).json(newProduct)
    } catch (error) {
        if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
    }
}

//Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Products.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

//Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const change = req.body
    const product = await Products.findByIdAndUpdate(
      id,
      { $set: change },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};