const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");
const User = require("../models/User");

//create rating
exports.createRating = async (req, res) => {
  try {
    //get user ID
    const userId = req.user.id;
    //console.log("user id", userId);

    //fetch data
    const { rating, review, courseId } = req.body;
    //console.log("course id", courseId);

    console.log("courseId type:", typeof courseId, courseId);
    console.log("userId type:", typeof userId, userId);

    //check user enrolled or not
    const courseDetails = await Course.findOne({
      _id:(courseId),
      studentEnrolled:userId,
    });

     console.log(courseDetails);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "user is not enrolled",
      });
    }

    //check if user already reviewed
    const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course:courseId });

    if (alreadyReviewed) {
      return res.status(403).json({
        succes: false,
        message: "user already reviewed",
      });
    }

    //create review
    const ratingRiewDetail = await RatingAndReview.create({
      user: userId,
      course:courseId,
      rating: rating,
      review: review,
    });

    //update course with rating and rewiew
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingRiewDetail._id,
        },
      },
      { new: true }
    );

    console.log(updatedCourse);
    //return res
    return res.status(200).json({
      succes: true,
      message: "rating and review created and add to course successfully",
    });
  } catch (error) {
    console.log("error in create rating");
    res.this.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//getAvgRating
exports.getAvgRating = async(req, res) =>{
    try {
        //get course Id
        const courseId = req.body.courseId;

        //calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])

        //return rating
        if(result.length > 0){
            return res.status(200).json({
                succes:true,
                message:"average rating sent",
                averageRating:result[0].averageRating,
            });
        }

        return res.status(200).json({
            succes:true,
            message:"average rating is 0,now rating given till now",
            averageRating:0,
        })
    } catch (error) {
        console.log("error in getAvgRating");
        res.status(500).json({
            succes:false,
            message:error.message,
        });
    }
}

//get all rating and reviews
exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastName image email",
        })
        .populate({
            path:"course",
            select:"courseName",
        })
        .exec();

        return res.status(200).json({
            succes:true,
            message:"all rating and review sent",
            data:allReviews,
        });
    } catch (error) {
        console.log("error in getAllRating");
        res.status(500).json({
          succes: false,
          message: error.message,
        });
    }
}