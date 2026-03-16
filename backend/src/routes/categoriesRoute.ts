import express from "express";
import {
  getAllCategories,
  createCategories,
  updateCategories,
  deleteCategories,
} from "../controllers/categoriesController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = express.Router();

router.get("/categories", getAllCategories);

router.post("/categories", authMiddleware, adminMiddleware, createCategories);

router.delete(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategories,
);

router.patch(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  updateCategories,
);

export default router;
