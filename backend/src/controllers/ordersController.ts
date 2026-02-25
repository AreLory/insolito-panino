import {
  CreateOrderBody,
  IOrderItem,
  OrderType,
} from "../types/IOrders";
import Orders from "../models/orders";
import { Request, Response } from "express";
import Products from "../models/products";
import Extras from "../models/extras";
import mongoose, { Types } from "mongoose";
import { IProduct } from "../types/IProducts";
import { IExtras } from "../types/IExtras";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const orders = await Orders.find({user: userId}).sort({ _id: -1 });
    res.status(200).json(orders);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

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

export const getActiveOrder = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const order = await Orders.findOne({ user: userId }).sort({ _id: -1 });

    res.status(200).json(order ?? null);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Unknown error" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { items, paymentMethod, orderType, notes } =
      req.body as CreateOrderBody;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Empty order" });
    }

    for (const item of items) {
      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        return res
          .status(400)
          .json({ error: `Invalid quantity for product ${item.productId}` });
      }
    }

    const productIds: string[] = items.map((i) => i.productId);
    const products: IProduct[] = await Products.find({
      _id: { $in: productIds },
    });

    const missing = productIds.filter(
      (id) => !products.some((p) => p._id.equals(id)),
    );

    if (missing.length > 0) {
      return res
        .status(400)
        .json({ error: "Invalid product in order", missing });
    }

    const allExtraIds = items.flatMap((i) => 
      (i.selectedExtras ?? []).map(e => typeof e === 'string' ? e : e._id)
    ).filter(Boolean);
    const extrasFromDb = await Extras.find({
      _id: { $in: allExtraIds },
    }).lean() as IExtras[];

    const orderItems: IOrderItem[] = items.map((item) => {
      const product = products.find((p) => p._id.equals(item.productId));
      if (!product) throw new Error(`Invalid product: ${item.productId}`);

      let unitPrice = product.basePrice;
      let selectedSize: { label: string; price?: number } | null = null;

      if (item.selectedSize) {
        const size = product.sizes?.find(
          (s) => s.label === item.selectedSize!.label,
        );
        if (!size) throw new Error(`Invalid size for ${product.name}`);
        unitPrice = size.price;
        selectedSize = { label: size.label, price: size.price };
      }

      const selectedExtras = (item.selectedExtras ?? []).map((extra) => {
        const extraData = typeof extra === 'string' ? { _id: extra } : extra;
        const extraFromDb = extrasFromDb.find((e) => e._id.toString() === extraData._id.toString());
        if (!extraFromDb || !extraFromDb.available)
          throw new Error(`Invalid extra selected`);

        return {
          extraId: extraFromDb._id,
          name: extraFromDb.name,
          price: extraFromDb.price || 0,
        };
      });

      const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
      const itemTotal = (unitPrice + extrasTotal) * item.quantity;

      return {
        product: product._id,
        name: product.name,
        unitPrice,
        quantity: item.quantity,
        itemTotal,
        selectedSize,
        removedIngredients: item.removedIngredients ?? [],
        selectedExtras,
      };
    });

    let subtotal = orderItems.reduce((sum, i) => sum + i.itemTotal, 0);

    let total = subtotal;

    if (orderType === OrderType.DELIVERY) {
      total += 2.5;
    }

    const newOrder = new Orders({
      user: req.userId,
      items: orderItems,
      subtotal,
      total,
      paymentMethod,
      // default = unpaid
      paymentStatus: "unpaid",
      orderType,
      notes,
      status: "pending",
    });

    await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Server error" });
    }
  }
};

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
