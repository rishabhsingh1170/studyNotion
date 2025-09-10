const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utiles/imageUploader");

//create subsection
exports.createSubsection = async (req, res) => {
  try {
    //fetch data
    const { sectionId, title, timeDuration, description } = req.body;
    //fetch video
    const video = req.files.videoFile;
    //console.log(video)

    //validate
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(401).json({
        succuss: false,
        message: "requied all properies",
      });
    }

    //uploade video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    //create subsection
    const subsectionDetails = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    //update section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSections: subsectionDetails._id,
        },
      },
      { new: true }
    );

    //HW:log updated section here->after adding populate query
    return res.status(200).json({
      success: true,
      message: "subsection created successfully",
      updatedSection,
    });
  } catch (error) {
    console.log("error in create subsection");
    return res.status(500).json({
      succuss: false,
      message: error.message,
    });
  }
};

//update subsection
exports.updatedsubsection = async (req, res) => {
  try {
    //fetch data
    const { subsectionId, title, timeDuration, description } = req.body;
    //fetch video
    const video = req.files.videoFile;

    //validate
    if (!subsectionId || !title || !timeDuration || !description || !video) {
      return res.status(401).json({
        succuss: false,
        message: "requied all properies",
      });
    }

    //uploade video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    //updation
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      {_id:subsectionId},
      {
        title,
        timeDuration,
        description,
        videoUrl: uploadDetails.secure_url,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "subsection updated successfully",
      updatedSubSection,
    });
  } catch (error) {
    console.log("error in subsection updation");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete subsection
exports.deleteSubsection = async (req, res) => {
  try {
    //fetch subsection id-assuming we are sending id in params
    const { subsectionId } = req.body;
    console.log(subsectionId);
    //deletion
    await SubSection.findByIdAndDelete(subsectionId);

    //TODO:delete entry from section containt
    const sectionDetails = await Section.findOne({ subSections:subsectionId});
    await Section.findByIdAndUpdate(sectionDetails._id, {
      $pull: {
        subSections:subsectionId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "subsection deleted successfully",
    });
  } catch (error) {
    console.log("error in subsection deletion");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
