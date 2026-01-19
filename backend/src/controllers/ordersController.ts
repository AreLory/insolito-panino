import { IOrder } from "../types/IOrders";
import Orders from "../models/orders";
import { Request, Response } from "express";

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
       const {
        date,
        products,
        user
       } = req.body


       const newOrder:IOrder = new Orders ({
        date,
        products,
        user
       })

       await newOrder.save()
       res.status(200).json(newOrder)
    } catch (error) {
        if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
    }
}


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
    const change = req.body
    const order = await Orders.findByIdAndUpdate(
      id,
      { $set: change },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};