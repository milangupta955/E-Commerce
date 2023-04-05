const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        required: [true,"Quantity is Required"],
        min: [1,"Quantity can't be less than 1"]
    },
    pname: {
        type: String,
        required: [true,"Name is Required"]
    },
    productPic: {
        type: String,
        required: [true,"Product Pic Is Required"]
    },
    price: {
        type: Number
    }
});
const cartModel = mongoose.model('cart',cartSchema);
module.exports = cartModel;