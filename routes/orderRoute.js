import express from "express"
import {createTransaction,  createOrder , getOrderByUserId} from "../controllers/orderController.js";

const OrderRouter=express.Router();

OrderRouter.post('/transaction',createTransaction)
OrderRouter.post('/',createOrder)
OrderRouter.get('/:userid',getOrderByUserId)

export default OrderRouter;