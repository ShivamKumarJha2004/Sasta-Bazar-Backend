import express from "express"
import getProductByCategoryID from "../controllers/productController.js";

const OrderRouter=express.Router();

router.post('',getProductByCategoryID)
export default OrderRouter;