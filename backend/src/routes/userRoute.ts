import express  from "express";
import { getUsers ,createUser, userLogin, userLogout, getCurrentUser, updateUser } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router()


// ! For USERS

//Register
router.post('/auth/register', createUser);
//login
router.post('/auth/login', userLogin)
//logout
router.post('/auth/logout', authMiddleware ,userLogout)
// Get /me
router.get('/users/me', authMiddleware , getCurrentUser)
//update
router.patch('/users/me', authMiddleware, updateUser)
// ! For ADMIN

//Get Users
router.get('/users', getUsers)

export default router