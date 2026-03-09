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
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = express.Router();

router.post("/orders", authMiddleware, createOrder);
router.get("/orders", authMiddleware, getAllOrders);
router.get("/orders/active", authMiddleware, getActiveOrder);
router.get("/orders/:id", getOrder);
router.delete("/orders/:id", deleteOrder);

router.patch("/admin/orders/:id",authMiddleware, adminMiddleware,  updateOrder);

export default router;
