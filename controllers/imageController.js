const express = require('express');
const router = express.Router();
const PatientService = require('../services/patientService'); 

const cloudinary = require('cloudinary')

console.log("img controller")

exports.imgUpload= async (req, res) => {
    // const patientId = 17;
    const patientId = req.params.patientId;
    // console.log(patientId,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    // const patientData = req.body;
    const imgFile = req.file; 
    console.log(imgFile,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

    try {
        const imageFile = await this.uploadImage(imgFile);
        const result = await PatientService.editProfilePic(patientId, imageFile);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.uploadImage = async function (imgFile, res, next) {
    // console.log("create");
    // console.log(imgFile.path)
  
    try {
      const imgUpload = await cloudinary.uploader.upload(
        imgFile.path,
        { folder: "patient_id" }
      );
    //   console.log(imgUpload)
    return imgUpload;
    }catch(error){
        throw error
    }
}