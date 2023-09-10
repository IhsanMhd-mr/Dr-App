const DrService = require('../services/DrService.js');
const Doctor = require('../config/Doctor.js');
const express = require('express');
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Register a new doctor
exports.register = async (req, res) => {
  try {
    const data = req.body;

    // Check if request body contains data
    if (!data) {
      return res.status(400).json({ error: "Data is missing in the request body" });
    }

    // Create a new Doctor object from request data
    const newDoctor = new Doctor(data.fname, data.email, data.password, data.phone_no);

    // Call the registration service
    const result = await DrService.registerDoctor(newDoctor);

    res.status(200).json({ result: result, Entered: newDoctor });
  } catch (error) {
    console.error("Error in doctor registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login a doctor
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await DrService.loginDoctor(email, password);

    // Set the access token inside result.....
    res.cookie("accessToken", result.accessToken, {
      maxAge: 3600000,
      httpOnly: true,
      status: true,
      userType: 'user',
      admintype: null
    });
    
    res.status(200).json({ message: result.message ,accessToken:result.accessToken});
  } catch (error) {
    console.error("Error in doctor login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a list of all doctors
exports.getAll = async (req, res) => {
  try {
    const doctors = await DrService.listAllDoctors();
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error in listing doctors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
