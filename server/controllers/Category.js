const Category = require("../models/Category");

//create tag
exports.createCategory = async (req, res) => {
  try {
    //fetch data from body
    const { name, description } = req.body;

    //validation
    if (!name || !description) {
      return res.status(401).json({
        success: false,
        message: "all fields required",
      });
    }

    //create entry
    const category = await Category.create({
      name: name,
      description: description,
    });

    console.log(category);

    return res.status(200).json({
      success: true,
      message: "category created successfully",
    });
  } catch (error) {
    console.log("error in create category");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all tags
exports.showAllCategory = async (req, res) => {
  try {
    const categories = await Category.find(
      {},
      { name: true, description: true }
    );
    return res.status(200).json({
      success: true,
      message: "category return successfully",
      categories,
    });
  } catch (error) {
    console.log("error in showAllCategory");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get courses based on category
exports.categoryPageDetails = async (req, res) => {
  try {
    //get category
    const { categoryId } = req.body;
    console.log(categoryId);
    //get courses of specified category
    const selectedCategory = await Category.findById({ _id: categoryId })
      .populate("courses")
      //.exec();
    //validate
    if (!selectedCategory) {
      return res.status(404).json({
        succes: false,
        message: "data not found",
      });
    }

    //get courses from different categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      //.exec();

    //get top courses
    const topCourses = (
      await Category.find({}).populate("courses").sort({ studentEnrolled: -1 })
    )//.exec();

    return res.status(200).json({
      succes: true,
      data: {
        selectedCategory,
        differentCategories,
        topCourses,
      },
    });
  } catch (error) {
    console.log("error in categoryPageDetails");
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};

//get all 
