const { error } = require('console');
const query = require('../services/patientService');
let voidVal =false ;

//  Handle Register User

exports.register = async (req,res) => {
    console.log('Register User');
    Patient = req.body;

    try {
        console.log('Register User 2');
        const result = await query.register(Patient);
        console.log('Register User 3');
        res.status(200).json({ message: result.message });
    } catch (error) {
        console.error("Error in user login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Handle fetching all users
exports.getAll = async (req, res) => {
    try {
        const users = await query.getAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error getting all users:", error);
        res.status(500).json({ error: "Internal Server Error" });
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
exports.getPatientById = async (req, res) => {
    const patientId = req.params.patientId;

    try {
        // console.log('req id',userId)
        const patient = await query.getPatientById(patientId);
        if (!patient) {
            return res.status(404).json({ error: "User not found" });
        }
        if (voidVal!=true){res.status(200).json(patient);}
        else if(voidVal == true){
            // console.log(error,"fdooo",patient.patientId);
            return patient;
        }
    } catch (error) {
        console.error("Error getting user by ID:", error);
        res.status(500).json({ error: "Internal Server Error in fetching" });
    }
    
};

exports.getPatientByName = async (req,res) => {
    const keyword = req.body.keyword;
    try{
        const patients = await query.getByName(keyword);
        if(!patients){
            return res.status(404).json({ error: "patients not found "});
        }else{res.status(200).json(patients);}

    }catch(error){
        console.error("Error getting user by ID:", error);
        res.status(500).json({ error: "Internal Server Error in fetching" });
    }
};




// Handle updating a Patient by ID
exports.editPatient = async (req, res) => {
    
    // let patientId = req.params.patientId;
    // let Patient1 = req.body;

    let {patientId, ...Patient1} = req.body;
    const existingRecord = await query.getPatientById(patientId); 
    let Patient = Patient1;
    // console.log(existingRecord.patientId,">>>>>>>>>>>>>>>>>>>>>>DDDDDDDDDDDDDDDD")

    if(patientId===parseInt(existingRecord.patientId)){
        try {
            const result = await query.editPatient(patientId,Patient);
            let updatedPatient = await query.getPatientById(patientId);
            res.status(200).json({ message: result.message,updatedPatient });
        } catch (error) {
            console.error("Error updating user:");
            res.status(500).json({ error: "Internal Server Error" });
        }
    }else{
        return res.status(404).json({ error: "User not found" });
    }
    voidVal = false; 
};

//  delete user by ID
exports.deletePatient = async (req, res) => {
    let patientId = req.params.patientId;
    
    const existingRecord = await query.getPatientById(patientId); 

    if (patientId === null){
        console.log("patientId = Undefoned"); 
        return res.status(404).json({ error: "User not found" });
    }else if (patientId == parseInt(existingRecord.patientId)){
        console.log("patientId is defoned",patientId)
        try {
            const result = await query.deletePatient(patientId);
            res.status(200).json({ message: result.message });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        };
    }
    return patientId;
};
