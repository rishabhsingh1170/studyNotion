const express = require("express");
const { auth, isInstructer, isAdmin, isStudent } = require("../middlewares/auth");
const { createCategory, showAllCategory, categoryPageDetails } = require("../controllers/Category");
const { createCourse, getCourseDetails, showAllCourse } = require("../controllers/Course");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const { createSubsection, updatedsubsection, deleteSubsection } = require("../controllers/Subsection");
const { createRating, getAvgRating, getAllRating } = require("../controllers/RatingAndReview");
const router = express.Router();

/****************************CATEGORY ROUTES************************** */
//category can only created by admine
router.post("/create-category", auth, isAdmin, createCategory);
router.get("/showAllCategory", showAllCategory);
router.get("/categoryPageDetails", categoryPageDetails);

/**************************** COURSE ROUTES ****************************/

/*---------------------- course creation -------------------------------*/

//course can only be created by instructor
router.post("/createCourse", auth, isInstructer, createCourse);
//add section to a course
router.post("/addSection", auth, isInstructer, createSection);
//add subsection to section
router.post("/addSubsection", auth, isInstructer, createSubsection);

/*---------------------course updation ---------------------------------*/

//course updation only done by instructor
//update section
router.post("/updateSection", auth, isInstructer, updateSection);
//update subsection
router.post("/updateSubsection", auth, isInstructer, updatedsubsection)

/*--------------------- course deletion ------------------------------*/
//delete section
router.post("/deleteSection", auth, isInstructer, deleteSection);
//delete subsection
router.post("/deleteSubsection", auth, isInstructer, deleteSubsection);

/*---------------------- show all courses ----------------------------*/
router.get("/getAllCourse", auth, showAllCourse);
/*------------------------get course details ----------------------- */
router.post("/getCourseDetails", auth, getCourseDetails);

/************************ REVIEW AND RATING ************************ */
//route for create rating
router.post("/createRatingAndReview", auth, isStudent, createRating);
//route for get average rating
router.get("/getAverageRating", getAvgRating);
//route for get all rating
router.get("/getAllRating", getAllRating);

module.exports = router;