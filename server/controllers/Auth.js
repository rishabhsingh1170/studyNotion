const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//send otp
exports.sendOTP = async (req, res) => {
  try {
    //fetch email from request body
    const { email } = req.body;

    //check user already present
    const isUserPresent = await User.findOne({ email });

    //if user present , then send response
    if (isUserPresent) {
      return res.status(401).json({
        success: false,
        message: "user already present",
      });
    }

    //generate otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("otp generated", otp);

    //check otp is unique
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      //check otp is unique
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayLoad = { email, otp };

    //create entry of otp
    const otpBody = OTP.create(otpPayLoad);
    console.log(otpBody);

    //return response
    return res.status(200).json({
      success: true,
      message: "otp sent successfull",
      otp,
    });
  } catch (error) {
    console.log("error in sendOtp", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//SIGN UP

exports.signUp = async (req, res) => {
  try {
    //fetch data from req body
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
    } = req.body;

    //validation
    //check all details filled or not
    if (
      !accountType ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "fill all details",
      });
    }
  
    //check password and confirmPassword is same
    if (password != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm password should be same",
      });
    }

    //check phone no lenght
    //contactNumber = contactNumber.trim();
    // if (contactNumber.trim().length < 10) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "phone no should be atleast 10 digit",
    //   });
    // }

    //check email already exist

    const isEmailPresent = await User.findOne({ email });
    console.log(isEmailPresent);

    if (isEmailPresent) {
      return res.status(400).json({
        success: false,
        message: "User already register",
      });
    }

    //find most recent otp
    //console.log(email);
    const recentOtp = await OTP.findOne({ email:email }).sort({ createdAt: -1 });
    //console.log("recent otp", recentOtp);

    //validate OTP
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "otp not found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "invalid otp",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create entry in db
    const userProfile = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      password: hashedPassword,
      accountType,
      email,
      additionalDetails: userProfile._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.log("error in sign up", error);
    return res.status(500).json({
      success: false,
      message: "user can not be registered !please try again later",
    });
  }
};

//LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "all field required",
      });
    }

    // check user exist
    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not registered",
      });
    }

    //generate JWT token after match password
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        accountType: user.accountType,
        id: user._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "Logged In Successfully",
        token,
        user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "invalide createntials",
      });
    }
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
