const express = require('express');
const { addProduct, getAllProduct, getProductById, updateProduct, deleteProduct } = require('../Controller/productController');
const {protectedRoute} = require('../Utility/protectedRoute');
const {adminprotectedRoute} = require('../Utility/adminProtectedRoute');
const productRouter = express.Router();

productRouter.post('/addProduct',protectedRoute,addProduct);
productRouter.get('/getAllProduct',getAllProduct);
productRouter.get('/getOneProduct/:id',getProductById);
productRouter.patch('/updateProduct/:id',adminprotectedRoute,updateProduct);
productRouter.delete('/deleteProduct/:id',adminprotectedRoute,deleteProduct);
module.exports = productRouter;