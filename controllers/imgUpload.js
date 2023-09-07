const { log, error } = require("console");
const Report = require("../services/reportServices");
const img = require("../controllers/imgUpload");
const upload = require("../lib/multer");

const cloudinary = require('cloudinary')
require('../lib/cloudinary')

exports.uploadImage =upload.single("reportImage"), async function (req, res, next) {
    console.log("create");
    console.log(req.file.path)
  
    try {
      const imgUpload = await cloudinary.uploader.upload(
        req.file.path,
        { folder: "patient_id" }
      );
      console.log(imgUpload)
    return imgUpload;
    }catch(error){throw error}
}
