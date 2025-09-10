const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { login, signUp, sendOTP } = require("../controllers/Auth");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");

//route for user login
router.post("/login", login);

//route for sign up
router.post("/signup", signUp);

//route for sending otp to user's email
router.post("/sendOTP", sendOTP);


//export the router for use in main application
module.exports = router