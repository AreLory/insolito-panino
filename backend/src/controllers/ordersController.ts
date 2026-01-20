import { IOrder } from "../types/IOrders";
import Orders from "../models/orders";
import { Request, Response } from "express";
import Products from "../models/products";

//Orders List
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Orders.find();
    res.status(200).json(orders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};
//Get Order Info
export const getOrder = async (req: Request, res: Response) => {
  try {
    const ordId = req.params.id;
    const order = await Orders.findById(ordId);
    res.status(200).json(order);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

//Create Order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, paymentMethod, orderType, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Empty order" });
    }
    const products = await Products.find({
      _id: { $in: items.map((item: { productId: string }) => item.productId) },
    });

    let subtotal = 0;

    const orderItems = items.map(
      (item: {
        productId: string;
        sizeId: string;
        quantity: number;
        removedIngredients?: string[];
        extras?: { name: string; price: number }[];
      }) => {
        const product = products.find((p: any) => p._id.equals(item.productId));

        console.log("ITEM IDS:", items.map((i: { productId: string }) => i.productId));
console.log("PRODUCTS FOUND:", products.map((p: any) => p._id.toString()));

        if (!product) {
          throw new Error("Prodotto non valido");
        }

        const size = product.sizes?.find(
          (s: any) => s._id.toString() === item.sizeId,
        );
        if (!size) {
          throw new Error("Size non valida");
        }

        if (item.quantity < 1) {
          throw new Error("Quantità non valida");
        }


        let unitPrice = size.price;

        if (item.extras?.length) {
          unitPrice += item.extras.reduce((sum, e) => sum + e.price, 0);
        }

        
        const itemTotal = unitPrice * item.quantity;
        subtotal += itemTotal;

        return {
          product: product._id,
          name: `${product.name} (${size.label})`,
          price: unitPrice,
          quantity: item.quantity,
          removedIngredients: item.removedIngredients,
          extras: item.extras,
        };
      },
    );

    const total = subtotal;
      // ! Remove user id when auth is implemented
    const newOrder: IOrder = new Orders({
      // user: req.userId,
      user: "696e025992b843876ea73948",
      items: orderItems,
      subtotal,
      total,
      paymentMethod,
      paymentStatus: "unpaid",
      orderType,
      notes,
      status: "pending",
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

// Delete Order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await Orders.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update Order
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const change = req.body;
    const order = await Orders.findByIdAndUpdate(
      id,
      { $set: change },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
