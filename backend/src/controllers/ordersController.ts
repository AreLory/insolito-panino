import { IOrder, IOrderItem } from "../types/IOrders";
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

    console.log("📦 Creating order - userId:", req.userId);
    console.log("📦 Items received:", JSON.stringify(items, null, 2));

    if (!req.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Empty order" });
    }

    console.log("🔍 Looking for products with IDs:", items.map((i: any) => i.id));

    const products = await Products.find({
      _id: { $in: items.map((item: { id: string }) => item.id) },
    });

    console.log("✅ Found products:", products.length);

    const orderItems = items.map(
      (item: {
        id: string;
        name: string;
        basePrice: number;
        selectedSize?: { label: string; price: number };
        selectedIngredients?: string[];
        quantity: number;
      }) => {
        const product = products.find((p: any) => p._id.equals(item.id));

        if (!product) {
          throw new Error(`Prodotto non valido: ${item.id}`);
        }

        if (!item.selectedSize) {
          throw new Error(`Size non valida per ${item.name}`);
        }

        if (item.quantity < 1) {
          throw new Error("Quantità non valida");
        }

        let unitPrice = item.selectedSize.price;

        return {
          product: product._id,
          name: `${product.name} (${item.selectedSize.label})`,
          size: {
            label: item.selectedSize.label,
          },
          price: unitPrice,
          quantity: item.quantity,
          removedIngredients: item.selectedIngredients,
        };
      },
    );
    const total = orderItems.reduce(
          (sum:number, item:IOrderItem) => sum + item.price * item.quantity,
          0,
        );

    const newOrder: IOrder = new Orders({
      user: req.userId,
      items: orderItems,
      paymentMethod,
      paymentStatus: "unpaid",
      orderType,
      notes,
      status: "pending",
      total,
    });

    console.log("💾 Saving order...");
    await newOrder.save();
    console.log("✅ Order created:", newOrder._id);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("❌ Error creating order:", error);
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
