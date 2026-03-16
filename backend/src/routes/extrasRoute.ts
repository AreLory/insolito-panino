import express from "express";
import {
  createExtra,
  deleteExtra,
  getAllExtras,
  getExtra,
  updateExtra,
} from "../controllers/extrasController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = express.Router();

router.get("/extras", authMiddleware, adminMiddleware, getAllExtras);
router.get("/extras/:id", authMiddleware, adminMiddleware, getExtra);
router.post("/extras", authMiddleware, adminMiddleware, createExtra);
router.delete("/extras/:id", authMiddleware, adminMiddleware, deleteExtra);
router.patch("/extras/:id", authMiddleware, adminMiddleware, updateExtra);

export default router;
