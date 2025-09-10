const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  updateProfile,
  deleteProfile,
  getUsersDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/Profile");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");
const router = express.Router();

//route for update profile
router.post("/update-profile", auth, updateProfile);

//route for delete profile
router.delete("/deleteProfile", auth, deleteProfile);

//route for get user profile
router.get("/get-user-details", auth, getUsersDetails);

//route for update profile picture
router.post("/update-profile-picture", auth, updateDisplayPicture);

//route for get enrolled course by user
router.get("/get-enrolled-courses", auth, getEnrolledCourses);

//****************************** reset password *************************/
//route for generating reset password token
router.post("/reset-password-token", resetPasswordToken);

//route for reseting user password after verification
router.post("/reset-password", resetPassword);

module.exports = router;
