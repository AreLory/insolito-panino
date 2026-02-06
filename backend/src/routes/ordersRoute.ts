import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMyLastOrder,
  getOrder,
  updateOrder,
} from "../controllers/ordersController";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = express.Router();

// ! User

router.post("/orders",authMiddleware, createOrder);
router.get("/orders/me",authMiddleware, getMyLastOrder);
router.get("/orders/:id", getOrder);
router.delete("/orders/:id", deleteOrder);


// ! Admin only

router.get("/orders", getAllOrders);
router.patch("/orders/:id", updateOrder);


export default router;