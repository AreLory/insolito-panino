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

// ! For USERS

router.post("/auth/register", createUser);
router.post("/auth/login", userLogin);
router.post("/auth/logout", authMiddleware, userLogout);

router.get("/users/me", authMiddleware, getCurrentUser);
router.patch("/users/me", authMiddleware, updateUser);

// ! For ADMIN
router.get("/users", getUsers);

export default router;
