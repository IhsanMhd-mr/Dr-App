const DrRepo = require('../repo/ad_query');
const jwt = require('../config/JWT.js');
const bcrypt = require('bcrypt');
const { access } = require('fs');

exports.registerDoctor = async (doctorData) => {
  
  try {
    console.log(doctorData)
    const existingDoctor = await DrRepo.findByEmail(doctorData.email);

    if (existingDoctor) {
      return { message: "Email already registered" };
    }
    else{
      await DrRepo.createDoctor(doctorData);
    }

    return { message: "Doctor registered successfully" };
  } catch (error) {
    throw error;
  }
};


// exports.loginDoctor = async (email, password) => {
//   try {
//     const doctor = await DrRepo.findByEmail(email);
//     console.log(doctor)
//     if (!doctor) {
//       return { message: "No registered doctor for this email" };
//     }

//    // access token
   
//   } catch (error) {
//     console.log(error)
//     throw error;
//   }
// };
exports.loginDoctor = async (email, password) => {
  try {
    // Find the doctor by email using your repository (DrRepo).
    const doctor = await DrRepo.findByEmail(email);
    hashedPassword = doctor.password
    // If no doctor is found with the provided email, return an error message.
    if (!doctor) {
      return { message: "No registered doctor for this email" };
    }

    // Compare the provided password with the hashed password stored in the database.
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    // If the passwords match, return a success message.
    if (passwordMatch) {
      // access token goes here.................
      const user = {email:doctor.email,id:1}
      console.log(user)

      const accessToken = jwt.createToken(user,process.eventNames.ACCESS_TOKEN_SECRET);
      const refreshToken = jwt.loginDoctor(user, process.env.REFRESH_TOKEN_SECRET);

      console.log(accessToken)
      // res.json({})


      return { message: "Login successful",accessToken:accessToken ,refreshToken:refreshToken};
    } else {
      // If the passwords don't match, return an error message.
      return { message: "Incorrect password" };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


exports.listAllDoctors = async () => {
  try {
    const doctors = await DrRepo.getAllDoctors();
    return doctors;
  } catch (error) {
    throw error;
  }
};
