const { error } = require('console');
const pool = require('../server.js');
const table_name = 'patients';


// Handle user registration
exports.registerUser = async (Patient) => {
    try {
        console.log('before query')
        
        const query = `INSERT INTO ${table_name} (firstName, lastName, nic,  gender, dob, age, phone_no, per_address, occupation, patientDesc, pro_pic) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
        const [results] = await pool.query(query, [
            Patient.fname, 
            Patient.lname, 
            Patient.nic, 
            
            Patient.gender, 
            Patient.dob, 
            Patient.age,
            Patient.phone_no, 
            Patient.address, 
            Patient.occupation, 
            Patient.desc, 
            Patient.pro_pic
        ]);

        console.log('after query')
        return { success: true, message: 'Patinet registered successfully', 'results.insertId ':results.insertId };
    } catch (error) {
        console.error('Error registering patinet:', error.message);
        
        if (error.code === 'ER_DUP_ENTRY') {
            return { success: false, message: 'Patient NIC already exists in database' };
        }
        
        return { success: false, message: 'An error occurred during patinet registration :'+error };
    }
};


exports.emptyCheck = async () => {
    // filtered coulums
    const query = `SELECT COUNT(*) FROM ${table_name}`; 
    try {
        const [results] = await pool.query(query);
        if (results == 0){return 'table is empty';}
        else{
        return results,`${table_name}`;}
    } catch (error) {
        console.error('Error fetching all Patinets:', error.message);
        throw error;
    }
};

// Get All
exports.getAllPatients = async () => {
    // filtered coulums
        console.log('getall query')
    const query = `SELECT patientId, firstName, lastName, pro_pic, age, dob, phone_no, patientDesc, pro_pic  FROM ${table_name}`; 
    try {
        console.log('getall query')
        const [results] = await pool.query(query);
        return results;
    } catch (error) {
        console.error('Error fetching all Patinets:', error.message);
        throw error;
    }
};

// Get Patinetby Id
exports.getPatientById = async (patientId) => {
    const query = `SELECT * FROM ${table_name} WHERE patientId = ?`;
    try {
        const results = await pool.query(query, [patientId]);
        if (results.length === 0) {
            return null;
        } else {
             // console.log(results[0][0]);
            return results[0][0];
        }
    } catch (error) {
        console.error('Error fetching Patinet by ID:', error.message);
        throw error;
    }
};

// get patient's by firstNmae|| lastName
exports.getPatientByName = async(keyword)=>{    
    console.log("keyword : ",keyword)

    const query = `SELECT patientId, firstName, lastName, pro_pic, age, dob, phone_no, patientDesc, pro_pic FROM ${table_name} WHERE firstName = ? OR lastName = ? `
    try {
        // console.log('query : Get all by name ')
        const [results] = await pool.query(query,[keyword,keyword]);
        // console.log(results)
        return results;
    } catch (error) {
        console.error('Error fetching Patinets by name:', error.message);
        throw error;
    }
}

   

// Update by Patient Id
exports.updatePatientById = async (patientId, Patient) => {
    // console.log(
    //     Patient.fname, 
    //         Patient.lname, 
    //         Patient.nic, 
    //         Patient.password,
    //         Patient.gender, 
    //         Patient.dob, 
    //         Patient.age,
    //         Patient.phone_no, 
    //         Patient.address, 
    //         Patient.occupation, 
    //         Patient.desc, 
    //         Patient.pro_pic,
    //         patientId
    // )
    const query = `
    UPDATE ${table_name} 
    SET firstName = ?, lastName = ?,   gender = ?, dob = ?, age = ?, phone_no = ?, per_address = ?, occupation = ?, patientDesc = ?,   heartRate=?,bloodGroup=?,height=?,weight=?,   pro_pic=?
    WHERE patientId = ?`;
    try {
        // console.log(Patient.name, Patient.email, Patient.password, patientId);
        const results = await pool.query(query, [
            Patient.fname, 
            Patient.lname, 
            Patient.gender, 
            Patient.dob, 
            Patient.age,
            Patient.phone_no, 
            Patient.address, 
            Patient.occupation, 
            Patient.desc, 
            Patient.pro_pic,

            Patient.heartRate,
            Patient.bloodGroup,
            Patient.height,
            Patient.weight,

            patientId
        ]);

        if (results.affectedRows === 0) {
            // No rows were affected by the update, indicating Patinet not found
            return { success: false, message: 'Patinet not found' };
        } else {
            // Successful update
            // console.log(Patient.name, Patient.email, Patient.password, patientId, 'in queryfunc');
            return { success: true, message: 'Patinet updated successfully', patientId };
        }
    } catch (error) {
        console.error('Error updating Patinet by ID:', error.message);
        throw error; // Rethrow the error to be handled by the caller
    }
};



// Update by Patient Id
exports.updatePatientPicById = async (patientId, pro_pic) => {
    
    const query = `
    UPDATE ${table_name} 
    SET  pro_pic=?
    WHERE patientId = ?`;
    try {
        const results = await pool.query(query, [ 
            pro_pic,
            patientId
        ]);

        if (results.affectedRows === 0) {
            return { success: false, message: 'Patient not found' };
        } else {
            return { success: true, message: 'Patient pic updated successfully', patientId };
        }
    } catch (error) {
        console.error('Error updating Patinet by ID:', error.message);
        throw error;// Rethrow the error to be handled by the caller
    }
};

// Delete by Patinet Id
exports.deleteUser = async (patientId) => {
    
    // voidVal = true;    
    // const PatinetId = await exports.getPatinetByEmail(req, res); // Call getUserByEmail function to get the PatinetId
    // console.log(PatinetId);

    const query = `DELETE FROM ${table_name} WHERE patientId = ?`;
    try {
        const results = await pool.query(query, [patientId]);
        if (results.affectedRows === 0) {
            return { success: false, message: 'Patinet not found' };
        } else {
            return { success: true, message: 'Patinet deleted successfully', patientId };
        }
    } catch (error) {
        console.error('Error deleting Patinet:', error.message);
        throw error;
    } 
    // voidVal = false;
};
