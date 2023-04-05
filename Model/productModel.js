const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true,"Product Name is Required"]
    },
    description: {
        type: String,
        required: [true,"Description is Required"]
    },
    category: {
        type: String,
        required: [true,"Category Name is Required"]
    },
    price: {
        type: Number,
        required: [true,"Price of item Is Required"],
        validate: {
            validator: function() {
                return this.price > 0;
            }
        }
    },
    numAvailable: {
        type:Number,
        min: [0,"The Availabilty cant be less than zero"]
    },
    itemPicture: {
        type: String
    },
    numRating: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    }
});

const productModel = mongoose.model("product",productSchema);
module.exports = productModel;