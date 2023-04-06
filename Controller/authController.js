const userModel = require('../Model/userModel');
const jwt = require('jsonwebtoken');
const privateKey = process.env.privateKey || require('../secrets').privateKey;
const sendMail = require('../Utility/sendMail');

module.exports.signup = async function (req, res) {
    try {
        const { name, email, password, profilepic } = req.body;
        const user = await userModel.create({
            name: name,
            email: email,
            password: password,
            profilePic: (profilepic != '') ? profilepic : ""
        });
        if (user) {
            res.status(201).json({
                message: "User Created SuccessFully",
                result: user
            })
        } else {
            res.status(401).json({
                message: "There Might be some error while creating an user"
            })
        }
    } catch (err) {
        res.status(501).json({
            message: "There is Some Error",
            error: err.message
        })
    }
}


module.exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        if (user) {
            if (password === user.password) {
                // create a jwt token 
                const loginToken = jwt.sign({
                    data: user["_id"],
                }, privateKey, { expiresIn: 24 * 15 * 60 * 60 });
                res.cookie('login', loginToken);
                user.password = undefined;
                console.log(user);
                res.status(201).json({
                    message: "Logged In SuccessFully",
                    data: {
                        user:user,
                        token:loginToken
                    },
                });
            } else {
                res.status(401).json({
                    message: "Wrong email or password"
                })
            }
        } else {
            res.status(401).json({
                message: "User with this email is not found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "There Might be Some Error Please Try Again",
            error: err.message
        })
    }
}

module.exports.forgotPassword = async function (req, res) {
    try {
        let { email } = req.body;
        let user = await userModel.findOne({ email: email });
        if (user) {
            let d1 = new Date(),
                d2 = new Date(d1);
            d2.setMinutes(d1.getMinutes() + 30);
            let otp = Math.floor((Math.random() * 1000000) + 1);
            sendMail(email, otp.toString());
            user.otp = otp;
            user.otpExpiry = d2;
            await user.save();
            res.json({
                message: "Otp Have been SuccessFully Sent to your email",
            });
        } else {
            res.status(401).json({
                message: "Email Not Associated With us",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports.resetPassword = async function (req, res) {
    try {
        let { otp, password } = req.body;
        let user = await userModel.findOne({ otp: otp });
        if (user) {
            const date = Date.now();
            if (user.otpExpiry > date) {
                user.password = password;
                user.otp = undefined;
                user.otpExpiry = undefined;
                await user.save();
                res.status(201).json({
                    message: "Password Reset Successfull",
                })
            } else {
                res.status(402).json({
                    message: "Otp Has Been Expired",
                })
            }
        } else {
            res.status(401).json({
                message: "Wrong Otp"
            })
        }
    } catch (err) {
        res.status(501).json({
            message: err.message
        })
    }
}