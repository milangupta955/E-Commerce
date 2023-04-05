const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors({
    credentials: true,
    origin: "http://localhost:3001",
}));
app.use(express.json());
app.use(cookieParser());
const authRouter = require('./Routes/authRoutes');
const productRouter = require('./Routes/productRoutes');
const reviewRouter = require('./Routes/reviewRoutes');
const orderRouter = require('./Routes/orderRoutes');
const cartRouter = require('./Routes/cartRoutes');
app.use('/auth',authRouter);
app.use('/product',productRouter);
app.use('/review',reviewRouter);
app.use('/order',orderRouter);
app.use('/cart',cartRouter);
app.listen(3000,function() {
    console.log("Listening on Port 3000");
})