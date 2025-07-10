import express from "express"
import getProductByCategoryID from "../controllers/productController.js";

const CategoryRouter=express.Router();

router.post('/:getproductbyId',getProductByCategoryID)
export default CategoryRouter;