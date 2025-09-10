// utils/cloudinaryConnect.js
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

const cloudinaryConnect = () => {
  try {
    dotenv.config();
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  } catch (error) {
    console.log("error in connecting cloudinary")
    console.error(error);
  }
};

module.exports = cloudinaryConnect;
