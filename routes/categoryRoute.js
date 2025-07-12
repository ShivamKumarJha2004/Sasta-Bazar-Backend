import express from "express"
import getAllCategory from "../controllers/categoryController.js";
const CategoryRouter=express.Router();

CategoryRouter.post('/getproduct',getAllCategory)
export default CategoryRouter;