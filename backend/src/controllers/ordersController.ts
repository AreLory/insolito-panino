import { CreateOrderBody, IOrder, IOrderItem, OrderType } from "../types/IOrders";
import Orders from "../models/orders";
import { Request, Response } from "express";
import Products from "../models/products";
import mongoose, { Types } from "mongoose";
import { IProduct } from "../types/IProducts";

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
//Get my last orders
export const getMyLastOrder = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const order = await Orders.findOne({ user: userId }).sort({ _id: -1 });
    if (!order) {
      return res.status(404).json({ error: "order not found" });
    }
    console.log({
      userId: req.userId,
      isObjectId: req.userId instanceof Types.ObjectId,
    });
    res.status(200).json(order);
  } catch (error) {
    console.error("🔥 GET MY ORDERS ERROR:", error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Unknown error" });
  }
};

//Create Order
export const createOrder = async (req: Request, res: Response) => {
  try {

    if (!req.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
22
    const {
      items,
      paymentMethod,
      orderType,
      notes,
    } = req.body as CreateOrderBody;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Empty order" });
    }


    for (const item of items) {
      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        return res
          .status(400)
          .json({ error: `Invalid quantity for product ${item._id}` });
      }
    }

    const productIds: string[] = items.map((i) => i._id);
    const products: IProduct[] = await Products.find({
      _id: { $in: productIds },
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({ error: "Invalid product in order" });
    }

  
    const orderItems: IOrderItem[] = items.map((item) => {
      const product = products.find((p) => p._id.equals(item._id));
      if (!product) {
        throw new Error(`Invalid product: ${item._id}`);
      }

      let unitPrice = product.basePrice;
      let selectedSize: { label: string; price?: number } | null = null;


      if (item.selectedSize) {
        const size = product.sizes?.find(
          (s) => s.label === item.selectedSize?.label
        );
        if (!size) throw new Error(`Invalid size for ${product.name}`);
        unitPrice = size.price;
        selectedSize = { label: size.label, price: size.price };
      }


      const extrasTotal = (item.extras ?? []).reduce(
        (sum, e) => sum + (e.price ?? 0),
        0
      );
      unitPrice += extrasTotal;

      return {
        product: product._id,
        name: product.name,
        unitPrice,
        quantity: item.quantity,
        selectedSize,
        removedIngredients: item.removedIngredients ?? [],
        extras: item.extras?.map((e) => ({
          name: e.name,
          price: e.price ?? 0,
        })) ?? [],
      };
    });


    let subtotal = orderItems.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0
    );

    let total = subtotal

    if (orderType === OrderType.DELIVERY) {
      total += 2.5
    }


    const newOrder = new Orders({
      user: req.userId,
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

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("❌ Error creating order:", error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Server error" });
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
