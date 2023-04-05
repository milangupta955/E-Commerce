const {signup, login, forgotPassword, resetPassword} = require('../Controller/authController');
const express = require('express');
const authRouter = express.Router();
authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.post("/forgotPassword",forgotPassword);
authRouter.patch("/resetPassword",resetPassword);

module.exports = authRouter;