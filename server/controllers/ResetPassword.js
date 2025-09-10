const User = require("../models/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utiles/mailSender");

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
      //fetch email from request body
      const email = req.body.email;

      //validate user
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: true,
          message: "user not exist",
        });
      }

      //genterate token
      const token = crypto.randomUUID();

      const updatedUser = await User.findOneAndUpdate(
        { email },
        {
          token: token,
          resetPasswordExpires: Date.now() + 5 * 60 * 1000,
        },
        { new: true }
      );

      //create url
      const url = `http//localhost:5173/update-password/${token}`;

      //send mail
      await mailSender(
        email,
        "reset password Link",
        `rest password Link ${url}`
      );

      res.json({
        success: true,
        message: "email sent successfully, please check your email",
      });
    } catch (error) {
        console.log("error in reset password token",error);
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//resetPassword
exports.resetPassword = async (req, res) => {
   try {
     //fetch data from body...here token is inserted in body by frontend
     const { password, confirmPassword, token } = req.body;

     //validation
     if (password !== confirmPassword) {
       return res.status(401).json({
         success: false,
         message: "password and confirm password should match",
       });
     }

     //get user corrosponding to token
     const userDetails = await User.findOne({ token });

     if (!userDetails) {
       return res.status(401).json({
         success: false,
         message: "invalid token",
       });
     }

     //check for time out
     if (userDetails.resetPasswordExpires < Date.now()) {
       return res.status(401).json({
         success: false,
         message: "token expire",
       });
     }

     //hash password
     const hashedPassword = await bcrypt.hash(password, 10);

     const updatedUser = await User.findOneAndUpdate(
       { token },
       { password: hashedPassword },
       { new: true }
     );

     return res.status(200).json({
       success: true,
       message: "password reset successfully",
     });
   } catch (error) {
    console.log("error in reset passwor");
    res.status(500).json({
        success:false,
        message:error.message,
    })
   }
}