const Course = require("../models/Course");
const Section = require("../models/Section");


//create section
exports.createSection = async (req, res) => {
    try {
        const {sectionName, courseId} = req.body;

        //validation
        if(!sectionName || !courseId){
            return res.status(401).json({
                success:true,
                message:"missing properties",
            });
        }

        //create section
        const sectionDetails = await Section.create({ sectionName });

        //inserting section to course containt
        const updatedCourseDetails = await Course.findByIdAndUpdate(
          { _id:courseId },
          {
            $push: {
              courseContent: sectionDetails._id,
            },
          },
          {new:true}
        );

        return res.status(200).json({
            success:true,
            message:"section created successfully",
            updatedCourseDetails,
        })
    } catch (error) {
        console.log("error in section creation");
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//update dection
exports.updateSection = async (req, res) =>{
    try {
        
        //fetch data
        const {sectionName, sectionId} = req.body;

        //validation
        if(!sectionId || !sectionName){
            return res.status(401).json({
                success:false,
                message:"required all properties",
            });
        }

        //updation
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true});

        return res.status(200).json({
            success:true,
            message:"section updated successfully",
            updatedSection,
        })
    } catch (error) {
        console.log("error in section updation");
        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}

//Delete section
exports.deleteSection = async (req, res) => {
    try {
        
        //fetch section id-assuming we are sending id in params
        const {sectionId} = req.params;
        //console.log(sectionId);

        //deletion
        await Section.findByIdAndDelete(sectionId); 

        //delete entry from course containt
        const courseDetails = await Course.findOne({courseContent:sectionId});
        await Course.findByIdAndUpdate({_id:courseDetails._id},{
            $pull:{
                courseContent:sectionId,
            }
        })
        
        return res.status(200).json({
            success:true,
            message:"section deleted successfully",
        })
    } catch (error) {
        console.log("error in section deletion");
        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}