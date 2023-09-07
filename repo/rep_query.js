const { error } = require('console');
const pool = require('../server.js');
const table_name = 'reports';


// Handle user registration
exports.addReport = async (Report) => {
    try {
        console.log('before query')
        let arr_AY=[ 
            Report.patientId, 
            Report.updatedDateTime,
            Report.heartRate, 
            Report.bloodGroup, 
            Report.height, 
            Report.weight, 
            Report.disease, 
            Report.reportImage, 
            Report.treatments, 
            Report.reportDocuments
        ]
        // console.log(arr_AY);
        const query = `INSERT INTO ${table_name}  (patientId, updatedDateTime, heartRate, bloodGroup, height, weight, disease, reportImage, treatments, reportDocuments) VALUES (?,?,?,?,?,?,?,?,?,?)`;
        const [results] = await pool.query(query, arr_AY);
        return { success: true, message: 'Report added successfully' };
    } catch (error) {
        console.error('Error adding report:', error.message);
        
        if (error.code === 'ER_DUP_ENTRY') {
            return { success: false, message: 'Report ID already exists in database' };
        }
        
        return { success: false, message: 'An error occurred during user registration :'+error };
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
        console.error('Error fetching all reports:', error.message);
        throw error;
    }
};

// Get All
exports.getAllreports = async () => {
    // filtered coulums
        console.log('getall query')
    const query = `SELECT reportId, patientId, updatedDateTime  FROM ${table_name}`; 
    try {
        console.log('getall query')
        const [results] = await pool.query(query);
        return results;
    } catch (error) {
        console.error('Error fetching all reports:', error.message);
        throw error;
    }
};

// Get a specific report
exports.getReportById = async (reportId) => {
    const query = `SELECT * FROM ${table_name} WHERE reportId = ?`;
    try {
        const results = await pool.query(query, [reportId]);
        if (results.length === 0) {
            return null;
        } else {
             console.log(results[0][0]);
            return results[0][0];
        }
    } catch (error) {
        console.error('Error fetching reportId by ID:', error.message);
        throw error;
    }
};

// Get report List of patient Id
exports.getReportByPatientId = async (patientId) => {
    console.log("oatientid")
    const query = `SELECT * FROM ${table_name} 
    WHERE patientId = ?
    `;
    try {
        const results = await pool.query(query, [patientId]);
        if (results.length === 0) {
            return null;
        } else {
             console.log(results[0]);
            return results[0];
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error.message);
        throw error;
    }
};

   

// Update by report Id
exports.updateReportById = async (reportId, Report) => {
   let values =[ 
    Report.patientId, 
    Report.updatedDateTime,
    Report.heartRate, 
    Report.bloodGroup, 
    Report.height, 
    Report.weight, 
    Report.disease, 
    Report.reportImage, 
    Report.treatments, 
    Report.reportDocuments,            
    reportId ]
    console.log(values,"values")
    const query = `
    UPDATE ${table_name} 
    SET  patientId = ? , updatedDateTime = ? , heartRate = ?,bloodGroup=?,height=?,weight=?,disease=?,  reportImage = ? , treatments = ? , reportDocuments = ? 
    WHERE reportId = ?`;
    try {
        // console.log(report.name, report.email, report.password, reportId);
        const results = await pool.query(query, values);

        if (results.affectedRows === 0) {
            // No rows were affected by the update, indicating user not found
            return { success: false, message: 'User not found' };
        } else {
            // Successful update
            console.log(Report,"oooooooooooooooooooooooooooooooooooooooooooooooooooo");
            console.log(results,"oooooooooooooooooooooooooooooooooooooooooooooooooooo");
            return { success: true, message: 'User updated successfully', reportId,results };
        }
    } catch (error) {
        console.error('Error updating user by ID:', error.message);
        throw error; // Rethrow the error to be handled by the caller
    }
};

// Delete by Report Id
exports.deleteReport = async (reportId) => {
    

    // const query = `SELECT FROM ${table_name} WHERE reportId = ?`;
    const query = `DELETE FROM ${table_name} WHERE reportId = ?`;
    try {
        const results = await pool.query(query, [reportId]);
        console.log(results);
        if (results.affectedRows === 0) {
            return { success: false, message: 'Report not found' };
        } else {
            return { success: true, message: 'Report deleted successfully', reportId };
        }
    } catch (error) {
        console.error('Error deleting Report:', error.message);
        throw error;
    } 
    // voidVal = false;
};

// Delete by All Reports by Patient Id
exports.deleteAllReports = async (patientId) => {
    ;

    const query = `DELETE FROM ${table_name} WHERE patientId = ?`;
    try {
        const results = await pool.query(query, [patientId]);
        if (results.affectedRows === 0) {
            return { success: false, message: 'Report not found' };
        } else {
            return { success: true, message: 'Report deleted successfully', patientId };
        }
    } catch (error) {
        console.error('Error deleting Report:', error.message);
        throw error;
    } 
};

