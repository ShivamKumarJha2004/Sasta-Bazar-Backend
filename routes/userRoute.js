import express from "express"
import { getUser, userSignup } from "../controllers/userController.js";

const UserRouter=express.Router();

router.get('/', getUser);
router.post('/register',userSignup)
export default UserRouter;