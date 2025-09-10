const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const { instance } = require("../config/razorpay");
const User = require("../models/User");
const mailSender = require("../utiles/mailSender");

exports.capturePayment = async (req, res) => {
    //fetch userId and courseId;
    const {courseId} = req.body;
    const userId = req.user.id;

    //validate
    if(!courseId){
        return res.status(400).json({
            success:false,
            message:"required valid course id",
        });
    }

    //validate course
    let course;
    try {
        course = await Course.findById(courseId);

        if(!course){
            return res.json({
                success:false,
                message:"could not find course",
            });
        }

        const uId = new mongoose.Types.ObjectId(userId);
        //check user already enrolled in the course
        if(Course.studentEnrolled.includes(uId)){
            return res.status(200).json({
                success:false,
                message:"student is already enrolled",
            });
        }
    } catch (error) {
        console.log("error in could find course");
        return res.json({
            success:false,
            message:error.message,
        });
    }

    //order create
    const amount = course.price;
    const currency = "INR";

    const option = {
        amount: amount*100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId,
            userId,
        }
    };

    try {
        //initiating payment using razorpay
        const paymentResponse = await instance.orders.create(option);
        console.log(paymentResponse);

        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        });
        
    } catch (error) {
        console.log("error in initiating payment");
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//verify signature of razorpay and server
exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";

    const signature = req.header["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("payment is authoriseed");

        const {courseId, userId} = req.body.payload.entity.note

        try {
          //find the course and enroll the student in it
          const enrolledCourse = await Course.findByIdAndUpdate(
            { _id: courseId },
            {
              $push: {
                studentEnrolled: userId,
              },
            },
            { new: true }
          );

          if (!enrolledCourse) {
            return res.status(500).json({
              success: false,
              message: "course not found",
            });
          }

          //find the student and add the course
          const userDetials = await User.findByIdAndUpdate(
            { _id: userId },
            {
              $push: {
                course: courseId,
              },
            },
            { new: true }
          );

          if (!userDetials) {
            return res.status(500).json({
              success: false,
              message: "user not found=",
            });
          }
          console.log(userDetials);

          //send mail
          const mailResponse = await mailSender(
            userDetials.email,
            "congratulations from studynotion",
            "congratulations, you are onboard into new studynotion course"
          );

          console.log(mailResponse);

          return res.status(200).json({
            success:true,
            message:"signature verified and course add",
          })
        } catch (error) {
            console.log("error in updating course and user details");
            return res.status(500).json({
                success:true,
                message:error.message,
            })
        }
    }
    else{
        return res.status(500).json({
            success:false,
            message:"invalide request",
        })
    }
}
