import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productsController";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);

router.post("/products", authMiddleware, adminMiddleware, createProduct);
router.delete("/products/:id", authMiddleware, adminMiddleware, deleteProduct);
router.patch("/products/:id", authMiddleware, adminMiddleware, updateProduct);

export default router;