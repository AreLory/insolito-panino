import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productsController";
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);

// ! Only admin PATCH, POST, DELETE
router.post("/admin/products", createProduct);
router.delete("/admin/products/:id", deleteProduct);
router.patch("/admin/products/:id", updateProduct);

export default router;