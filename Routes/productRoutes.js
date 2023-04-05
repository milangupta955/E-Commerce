const express = require('express');
const { addProduct, getAllProduct, getProductById, updateProduct, deleteProduct } = require('../Controller/productController');
const {protectedRoute} = require('../Utility/protectedRoute');
const productRouter = express.Router();

productRouter.post('/addProduct',addProduct);
productRouter.get('/getAllProduct',getAllProduct);
productRouter.get('/getOneProduct/:id',getProductById);
productRouter.patch('/updateProduct/:id',updateProduct);
productRouter.delete('/deleteProduct/:id',deleteProduct);
module.exports = productRouter;