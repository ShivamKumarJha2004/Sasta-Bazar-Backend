import express from  "express"
import UserRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import CategoryRouter from "./routes/categoryRoute.js"
import ProductRouter from "./routes/productRoute.js"
import OrderRouter from "./routes/orderRoute.js";
import { PORT } from "./utils/config.js";
import { buildAdminJS } from "./utils/setup.js";

dotenv.config()

const app=express();

// Add comprehensive request logging
app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user',UserRouter)
app.use('/category',CategoryRouter)
app.use('/product',ProductRouter)
app.use('/order',OrderRouter)

app.post('/test', (req, res) => {
  console.log('Test route hit');
  res.json({ ok: true });
});

// Add a simple test route for admin login debugging
app.post('/admin/login-test', (req, res) => {
  console.log('Admin login test route hit');
  res.json({ message: 'Admin login test route working' });
});

connectDB();
await buildAdminJS(app)

app.get('/', (req, res) => {
    return res.send('hello');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/admin`);
});


