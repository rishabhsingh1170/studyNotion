const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorisation").replace("Beerer", "");
      //console.log(token);

    //if token is missing then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }

    //verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token invalid",
      });
    }

    next();
  } catch (error) {
    console.log("error in auth middleware");
    return res.status(401).json({
        success:false,
        message:error.message,
    })
  }
};

//isStudent
exports.isStudent = async (req, res, next) =>{
    try {
        if(req.user.accountType !== "student"){
            return res.status(401).json({
                success:false,
                message:"protected route for students"
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"user role cannot be verified",
        })
    }
} 

//isInstructer
exports.isInstructer = async (req, res, next) => {
  try {
    if (req.user.accountType !== "instructor") {
      return res.status(401).json({
        success: false,
        message: "protected route for instructer",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user role cannot be verified",
    });
  }
}; 

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "admin") {
      return res.status(401).json({
        success: false,
        message: "protected route for admin",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user role cannot be verified",
    });
  }
}; 