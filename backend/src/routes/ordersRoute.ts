import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} from "../controllers/ordersController";
const router = express.Router();

// ! User

router.post("/orders", createOrder);
router.get("/orders/:id", getOrder);
router.delete("/orders/:id", deleteOrder);

// ! Admin only

//todo: only status and time update
router.get("/orders", getAllOrders);
router.patch("/orders/:id", updateOrder);


export default router;