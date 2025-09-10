const mongoose = require("mongoose");
const mailSender = require("../utiles/mailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },

    otp:{
        type:String,
        required:true,
    },

    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});

//function to send verification mail

const sendVerificationMail = async (email,otp)=>{
    try {
        const mailResponse = mailSender(email,"verification mail from studyNotion",otp);
        console.log("mail sent successfully", mailResponse);
    } catch (error) {
        console.log("error in sendVerificationMail",error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
    sendVerificationMail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);