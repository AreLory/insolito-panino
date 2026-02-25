import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getActiveOrder,
  getOrder,
  updateOrder,
} from "../controllers/ordersController";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/orders", authMiddleware, createOrder);
router.get("/orders", authMiddleware, getAllOrders);
router.get("/orders/active", authMiddleware, getActiveOrder);
router.get("/orders/:id", getOrder);
router.delete("/orders/:id", deleteOrder);

// ! Admin only

router.patch("/admin/orders/:id", updateOrder);

export default router;
