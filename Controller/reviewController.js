const reviewModel = require('../Model/reviewModel');
const productModel = require('../Model/productModel');
module.exports.addReview = async function (req, res) {
    try {
        let { comment, ratingGiven } = req.body;
        let productId = req.params.id;
        let userId = req.user_id;
        if(ratingGiven < 1 && ratingGiven > 5) {
            res.status(401).json({
                message: "Rating Must Be Less Than 5"
            })
        }
        let review = await reviewModel.create({
            userId: userId,
            productId: productId,
            comment: comment,
            ratingGiven: ratingGiven
        });
        if (review) {
            let product = await productModel.findById(productId);
            if (product) {
                let oldRating = (Number)(product.rating);
                let oldNumRating = (Number)(product.numRating);
                let newRating = (oldRating * oldNumRating + (Number)(ratingGiven)) / (oldNumRating + 1);
                // console.log(newRating);
                // console.log(product.rating + " " + ratingGiven + " " +product.numRating);
                product.rating = newRating;
                product.numRating++;
                await product.save();
                res.json({
                    message: "The Product Has Been SuccesFully Rated"
                })
            } else {
                res.json({
                    message: "The Product You are Trying to rate is not found"
                })
            }
        } else {
            res.json({
                message: "There Might be Some Error",
            }) 
        }
    } catch (err) {
        res.json({
            message: err.message,
            data: req.user_id
        })
    }
}

module.exports.getProductReview = async function (req, res) {
    try {
        const pid = req.params.id;
        const reviews = await reviewModel.find({ productId: pid }).populate({
            path: "userId",
            select: "name profilePic"
        });
        
        if(reviews) {
            res.status(201).json({
                message: "Reviews Fetched Successfully",
                data: reviews
            });
        } else {
            res.status(404).json({
                message: "No Reviews Found"
            })
        }
    } catch (err) {
        console.log(err.message);
        res.json({
            message: err.message
        });
    }
}

module.exports.getOneReview = async function (req, res) {
    try {
        const reviewId = req.params.id;
        const review = await reviewModel.findById(reviewId);
        if (review) {
            res.status(201).json({
                message: "Review Found",
                data: review
            });
        } else {
            res.status(404).json({
                message: "Review Not Found"
            })
        }
    } catch (err) {
        res.status(501).json({
            message: err.message
        })
    }
}

module.exports.updateReview = async function (req, res) {
    try {
        const reviewId = req.params.id;
        const DataToBeUpdated = req.body;
        const review = await reviewModel.findById(reviewId);
        if (review) {
            let user_id = req.user_id;
            if(review.userId == user_id) {
                for(let key in DataToBeUpdated) {
                    if(key === "ratingGiven") {
                        console.log("Here Come for editing Rating");
                        const prd = await productModel.findById(review.productId);
                        if(prd) {
                            console.log("Product Found SuccessFully");
                            let newRating = DataToBeUpdated[key];
                            let oldRating = prd.rating;
                            let newProductRating = ((Number)(oldRating) * (Number)(prd.numRating) + (Number)(newRating) - (Number)(review.ratingGiven)) / (Number)(prd.numRating);
                            console.log(newProductRating);
                            prd.rating = newProductRating;
                            await prd.save();
                        } else {
                            res.json({
                                message: "Product Not Found"
                            });
                        }
                    }
                    review[key] = DataToBeUpdated[key];
                }
                await review.save();
                res.json({
                    message: "Review Updated SuccesFully"
                })
            } else {
                res.json({
                    message: "You are Not Eligible to update Review"
                })
            }
        } else {
            res.status(404).json({
                message: "Review Not Found"
            })
        }
    } catch (err) {
        res.status(501).json({
            message: err.message
        })
    }
}

module.exports.deleteReview = async function (req, res) {
    try {
        const reviewId = req.params.id;
        const review = await reviewModel.findById(reviewId);
        if (review) {
            let user_id = req.user_id;
            if(review.userId == user_id) {
                let prd = await productModel.findById(review.productId);
                if(prd.numRating - 1 == 0) {
                    prd.rating = 0;
                    prd.numRating = 0;
                } else {
                    let newRating = ((Number)(prd.rating) * (Number)(prd.numRating) - (Number)(review.ratingGiven)) / ((Number)(prd.numRating) - 1);
                    prd.rating = newRating;
                    prd.numRating--;
                }
                await prd.save();
                await reviewModel.findByIdAndDelete(reviewId);
                res.json({
                    message: "Deleted SuccessFully"
                })
            } else {
                res.json({
                    message: "You are Not Eligible to Delete Review"
                })
            }
        } else {
            res.status(404).json({
                message: "Review Not Found"
            })
        }
    } catch(err) {
        res.status(501).json({
            message: err.message
        })
    }
}