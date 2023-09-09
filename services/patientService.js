const { error } = require('console');
const query = require('../repo/query');
const img = require("../controllers/imgUpload");
let voidVal =false ;

//  Handle Register User

exports.register = async (Patient) => {
    console.log('Register User');

    try {
        console.log('Register User 2');
        // const profilePic =  img.uploadImage;
        // Patient.pro_pic = profilePic;
        const result = await query.registerUser(Patient);
        console.log('Register User 3');
        return{ message: result.message };
    } catch (error) {
        throw(error);
    }
};

// Handle fetching all users
exports.getAll = async (req, res) => {
    try {
        const users = await query.getAllPatients();
        return users;
    } catch (error) {
        throw(error)
    }
};

// // Handle fetching a user by Mail
// exports.getUserByEmail = async (req, res) => {
//     const email = req.body.findEmail;
//     try {
//         console.log(email+'in try')
//         const user = await query.getUserByEmail(email);
//         let userId=null;
//         if (!user) {
//             if(voidVal != true){return res.status(404).json({ error: "User not found" });};
//             return userId;
//         }
//         if(voidVal != true){ res.status(200).json(user); }
//         return userId ;
        
//     } catch (error) {
//         console.error("Error getting user by ID:", error);
//         if(voidVal != true){res.status(500).json({ error: "Internal Server Error" });};
//         return error;
//     }
// };


// Handle fetching a patient by ID
exports.getPatientById = async (patientId) => {

    try {
        // console.log('req id',userId)
        const patient = await query.getPatientById(patientId);
        if (!patient) {
            return { error: "User not found" };
        }
        
            // console.log(error,"fdooo",patient.patientId);
            return patient;
        
    } catch (error) {
        throw error;
    }
    
    // voidVal = false;    
};

exports.getByName = async(keyword) => {
        try{
        const patients = await query.getPatientByName(keyword);

        if(patients.length===0){
            // console.log(error);
            return{error: "patients not found"}
        }else{
        return patients;}
    }catch(error){console.log(error);
        throw(error)}
}



// Handle updating a Patient by ID
exports.editPatient = async (patientId,Patient) => {
    console.log(patientId,"ASsss",Patient)
    const profilePic =  img.uploadImage; 
    if(profilePic){
        try{Patient.pro_pic = 'profilePic';}catch(error){console.log(error)}
    }

    try {
        console.log(patientId,"hhhhhhhhhhhh",Patient)
        const result = await query.updatePatientById(patientId,Patient);
        let updatedPatient = await query.getPatientById(patientId);
        return{ message: result.message,updatedPatient };
    } catch (error) {
        throw { error: "Internal Server Error" }
    }

};
// Handle updating ProfilePic by Patient ID
exports.editProfilePic = async (patientId,imageFile) => {
        const profilePic =  imageFile; 
        // console.log(profilePic.secure_url, "}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}>>>>>>>>>>>")
        if(profilePic){
            // try{Patient.pro_pic = 'profilePic';}catch(error){console.log(error)}
            try {
            const result = await query.updatePatientPicById(patientId,profilePic.secure_url);
            let updatedPatient = await query.getPatientById(patientId);
            return{ message: result.message,updatedPatient };
        } catch (error) {
            throw { error: "Internal Server Error" }
        }
        }else{
            return{ message :"Profile image not valid"}
        }

        
    
};

//  delete user by ID
exports.deletePatient = async (patientId) => {
    
    const existingRecord = await exports.getPatientById(patientId); 

    if (existingRecord.patientId === null){
        console.log("patientId = not found"); 
        return { error: "User not found" };
    }else if (patientId == parseInt(existingRecord.patientId)){
        console.log("patientId is defoned",patientId)
        try {
            const result = await query.deleteUser(patientId);
            return{ message: result.message };
        } catch (error) {            
        throw error;
        };
    }

};
