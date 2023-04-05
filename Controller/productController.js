const productModel = require('../Model/productModel');

module.exports.addProduct = async function(req,res) {
    try{
        let {productName,description,category,money,numAvailable,itemPicture} = req.body;
        const product = await productModel.create({
            productName: productName,
            description: description,
            category: category,
            price: money,
            numAvailable: numAvailable,
            itemPicture: itemPicture
        });
        if(product) {
            res.status(201).json({
                mesaage: "Product Has Been SuccessFully Added"
            });
        } else {
            res.status(401).json({
                message: "There Might Be Some Error While Adding"
            });
        }
    } catch(err) {
        res.status(501).json({
            message: err.message,
        })
    }
}

module.exports.getAllProduct = async function(req,res) {
    try {
        const products = await productModel.find();
        if(products) {
            res.json({
                message: "Product Found",
                products:products,
            })
        } else {
            res.status(404).json({
                message: "No Product Found"
            })
        }
    } catch(err) {
        res.status(501).json({
            message: err.message
        })
    }
}

module.exports.getProductById = async function(req,res) {
    try{
        let pid = req.params.id;
        let product = await productModel.findById(pid);
        if(product) {
            res.status(201).json({
                message: "Product Found",
                data: product
            });
        } else {
            res.status(404).json({
                message: "Product Not Found"
            })
        }
    } catch(err) {
        res.status(501).json({
            message: "There Might Be Some Error" + err.message
        })
    }
}

module.exports.updateProduct = async function(req,res) {
    try{
        let DataToBeUpdated = req.body;
        let pid = req.params.id;
        let product = await productModel.findById(pid);
        if(product) {
            for(let key in DataToBeUpdated) {
                product[key] = DataToBeUpdated[key];
            }
            await product.save();
            res.status(201).json({
                message: "Data Updated SuccessFully"
            })
        } else {
            res.status(404).json({
                message: "Product Not Found"
            })
        }
    } catch(err) {
        res.json(501).json({
            message: err.message
        })
    }
}

module.exports.deleteProduct = async function(req,res) {
    try{
        const pid =req.params.id;
        const product = await productModel.findByIdAndRemove(pid);
        if(product) {
            res.status(201).json({
                message: "Product Deleted"
            });
        } else {
            res.status(404).json({
                message: "Product Not Found"
            })
        }
    } catch(err) {
        res.status(501).json({
            message: err.message
        })
    }
}