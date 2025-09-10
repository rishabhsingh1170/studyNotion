const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utiles/imageUploader");

//create course
exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, whatYouWillLearn, price, category } =
      req.body;
    const thumbnail = req.files.thumbnail;

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "required all fields",
      });
    }

    //check for instructor
    const userId = req.user.id;
    //console.log(userId);
    const instructorDetails = await User.findById({ _id:userId });

    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "instructor not found",
      });
    }
    console.log("instructor details", instructorDetails);

    //validate tag
    const categoryDetail = await Category.findById({ _id:category });

    if (!categoryDetail) {
      return res.status(400).json({
        success: false,
        message: "tag not valid",
      });
    }

    //upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //create entry in db
    const newCourse = await Course.create({
      courseName: courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      thumbnail: thumbnailImage.secure_url,
      category: categoryDetail._id,
      instructor: instructorDetails._id,
    });

    //add a new course to user scema
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    //add course to tag
    await Category.findByIdAndUpdate(
      { _id: categoryDetail._id },
      {
        $push: {
          courses: newCourse._id,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log("error in creating course");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all courses
exports.showAllCourse = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentEnrolled: true,
      }
    )
      .populate()
      .exec();

    return res.status(200).json({
      success: true,
      message: "all courses fetched successfully",
      data: allCourses,
    });
  } catch (error) {
    console.log("error in fetching all courses");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get course details
exports.getCourseDetails = async (req, res) => {
  try {
    //fetch course id
    const { courseId } = req.body;

    //find course details
    const courseDetails = await Course.findById({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("ratingAndReviews")
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();
      //console.log(courseDetails)
      //validation
      if(!courseDetails){
        return res.status(400).json({
          success:false,
          message:"course details not found",
        })
      }

      return res.status(200).json({
        success:true,
        message:"course details sent",
        courseDetails,
      })

  } catch (error) {
    console.log("error in getCourseDetails");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
