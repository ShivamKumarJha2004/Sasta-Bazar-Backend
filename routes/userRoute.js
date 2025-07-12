import express from "express"
import { getUser, userSignup } from "../controllers/userController.js";

const UserRouter=express.Router();

UserRouter.get('/', getUser);
UserRouter.post('/register',userSignup)
export default UserRouter;