import express from "express"
import getAllCategory from "../controllers/categoryController.js";
const ProductRouter=express.Router();

router.post('/getproduct',getAllCategory)
export default ProductRouter;