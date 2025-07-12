import express from "express"
import getProductByCategoryID from "../controllers/productController.js";

const ProductRouter=express.Router();

ProductRouter.post('/:categoryId',getProductByCategoryID)
export default ProductRouter;