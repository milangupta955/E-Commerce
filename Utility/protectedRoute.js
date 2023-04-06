const jwt = require('jsonwebtoken');
const key = process.env.privateKey || require("../secrets").privateKey;
module.exports.protectedRoute = function(req,res,next) {
    let token = req.cookies.login;
    const payload = jwt.verify(token,key);
    if(payload) {
        const user_id = payload.data;
        req.user_id = user_id;
        next();
    } else {
        res.status(402).json({
            message: "You Must Logged In"
        })
    }
}