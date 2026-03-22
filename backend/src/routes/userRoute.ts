import express from "express";
import {
  getUsers,
  createUser,
  userLogin,
  userLogout,
  getCurrentUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = express.Router();

router.post("/auth/register", createUser);
router.post("/auth/login", userLogin);
router.post("/auth/logout", authMiddleware, userLogout);
router.get("/users/me", authMiddleware, getCurrentUser);
router.patch("/users/me", authMiddleware, updateUser);

router.get("/users", authMiddleware, adminMiddleware, getUsers);
router.delete("/users", authMiddleware, adminMiddleware, deleteUser);

export default router;
