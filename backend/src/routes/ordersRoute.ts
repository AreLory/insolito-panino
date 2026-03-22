import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllUserOrders,
  getActiveOrder,
  getOrder,
  updateOrder,
  getAllOrders,
} from "../controllers/ordersController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = express.Router();

router.post("/orders", authMiddleware, createOrder);
router.get("/activeorder", authMiddleware, getActiveOrder);
router.get("/myorders", authMiddleware, getAllUserOrders);
router.get("/orders/:id", getOrder);
router.delete("/orders/:id", deleteOrder);

router.get("/orders",authMiddleware, adminMiddleware,  getAllOrders);
router.patch("/orders/:id",authMiddleware, adminMiddleware,  updateOrder);

export default router;
