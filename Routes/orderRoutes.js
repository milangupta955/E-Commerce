const express = require('express');
const { protectedRoute } = require('../Utility/protectedRoute');
const { makeOrder, getAllOrders, getCustomerOrder, getOneOrder } = require('../Controller/orderController');
const orderRouter = express.Router();
orderRouter.post('/makeOrder',protectedRoute,makeOrder);
orderRouter.get('/getAllOrders',getAllOrders);
orderRouter.get('/getCustomerOrder',protectedRoute,getCustomerOrder);
orderRouter.get('/getOneOrder/:id',getOneOrder);
module.exports = orderRouter;