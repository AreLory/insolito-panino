import express  from "express";
import { createUser } from "../controllers/userController";

const router = express.Router()

//Get Users
// router.get('/users', getUsers)
//Register
router.post('/auth/register', createUser);
//login
// router.post('/auth/login', )

export default router