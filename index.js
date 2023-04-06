const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
const authRouter = require('./Routes/authRoutes');
const productRouter = require('./Routes/productRoutes');
const reviewRouter = require('./Routes/reviewRoutes');
const orderRouter = require('./Routes/orderRoutes');
const cartRouter = require('./Routes/cartRoutes');
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  var filePath = "./client/build/index.html";
  var resolvedPath = path.resolve(filePath);
  res.sendFile(
    resolvedPath,
    function (err) {
      res.status(500).send(err);
    }
  );
});
app.use('/auth',authRouter);
app.use('/product',productRouter);
app.use('/review',reviewRouter);
app.use('/order',orderRouter);
app.use('/cart',cartRouter);
app.listen(port,function() {
    console.log("Listening on Port 3000");
})