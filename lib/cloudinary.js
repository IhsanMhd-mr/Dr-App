const cloudinary = require("cloudinary").v2;

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImage = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, { folder: folder }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { uploadImage ,cloudinary};

