const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    ratingGiven: {
        type: Number,
        required: [true,"You Must Rate the Product"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    dateOfReview: {
        type: Date,
        default: Date.now()
    }
});
const reviewModel = new mongoose.model('reviews',reviewSchema);
module.exports = reviewModel;