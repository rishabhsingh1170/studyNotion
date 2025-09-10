const _default = require("otp-generator");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utiles/imageUploader");

//update profile
exports.updateProfile = async (req, res) => {
  try {
    //fetch data
    const { gender, dateOfBirth, about, contactNumber } = req.body;
    //get userId
    const userId = req.user.id;

    //validation
    if (!userId || !gender || !contactNumber || !dateOfBirth) {
      return res.status(401).json({
        success: false,
        message: "all field required",
      });
    }

    const user = await User.findById(userId);
    const profileId = user.additionalDetails;

    //update profile
    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      {
        gender,
        dateOfBirth,
        about,
        contactNumber,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "profile updation successfull",
      updatedProfile,
    });
  } catch (error) {
    console.log("error in update profilr");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete profile
exports.deleteProfile = async (req, res) => {
  try {
    //fetch user id
    const userId = req.user.id;
    //get profile id
    const userDetails = await User.findById(userId);

    //validation
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const profileId = userDetails.additionalDetails;

    await Profile.findByIdAndDelete({ _id: profileId });

    //TODO: unenrolled student from courses

    await User.findByIdAndDelete({ _id: userId });

    return res.status(200).json({
      success: true,
      message: "profile deleted successfully",
    });
  } catch (error) {
    console.log("error in delete profile");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get users details
exports.getUsersDetails = async (req, res) => {
  try {
    //fetch userId
    const userId = req.user.id;

    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user details sent succussfuly",
      userDetails,
    });
  } catch (error) {
    console.log("error in getUserDetails");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update display picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    //console.log(displayPicture);

    //validate user
    const userDetails = await User.findById({ _id: userId });

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    //upload image to cloudinary
    const displayPictureDetails = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME
    );

    //update in db
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { image: displayPictureDetails.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Display picture updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log("error in updateDisplayPicture controller");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    //fetch user id
    const userId = req.user.id;

    //validate user
    const userDetails = await User.findById({ _id: userId });

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    //get all courses user enrolled in
    const enrolledCourses = await User.findById(userId)
      .select("courses")
      .populate("courses");

    return res.status(200).json({
      success:true,
      message:"enrolled course sent",
    })  
  } catch (error) {
    console.log("error in getEnrolledCourse controller");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
