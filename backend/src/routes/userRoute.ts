import express from "express";
import {
  getUsers,
  createUser,
  userLogin,
  userLogout,
  getCurrentUser,
  updateUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/auth/register", createUser);
router.post("/auth/login", userLogin);
router.post("/auth/logout", authMiddleware, userLogout);
router.get("/users/me", authMiddleware, getCurrentUser);
router.patch("/users/me", authMiddleware, updateUser);

// ! Admin only
router.get("/admin/users", getUsers);

export default router;
