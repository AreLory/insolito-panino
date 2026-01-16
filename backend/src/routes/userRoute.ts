import express  from "express";
import { getUsers ,createUser, userLogin, userLogout } from "../controllers/userController";

const router = express.Router()


// ! For USERS

//Register
router.post('/auth/register', createUser);
//login
router.post('/auth/login', userLogin)
//logout
router.post('/auth/logout', userLogout)

// ! For ADMIN

//Get Users
router.get('/users', getUsers)

export default router