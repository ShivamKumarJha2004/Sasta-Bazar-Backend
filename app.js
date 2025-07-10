import express from  "express"
import UserRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import CategoryRouter from "./routes/categoryRoute.js"
import ProductRouter from "./routes/productRoute.js"
import OrderRouter from "./routes/orderRoute.js";

dotenv.config()

const app=express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user',UserRouter)
app.use('/category',CategoryRouter)
app.use('/product',ProductRouter)
app.use('/order',OrderRouter)




app.get('/', (req, res) => {
    return res.send('hello');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

connectDB();

