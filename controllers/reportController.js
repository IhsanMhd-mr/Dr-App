const { log, error } = require("console");
const Report = require("../services/reportServices");

const cloudinary = require('cloudinary')
require('../lib/cloudinary')
let voidVal = false;



exports.createReport = async function (req, res, next) {
    
    console.log(req.file.path)
  
    try {
      const imgUpload = await cloudinary.uploader.upload(
        req.file.path,
        { folder: "report_docs" }
      );
      console.log(imgUpload.secure_url);
  
      const newReport = new Report({
        patientId: req.body.patientId,
        updatedDateTime: req.body.updatedDateTime,
        heartRate: req.body.heartRate, 
        bloodGroup: req.body.bloodGroup, 
        height: req.body.height, 
        weight: req.body.weight, 
        disease: req.body.disease, 
        reportImage: imgUpload.secure_url,
        treatments: req.body.treatments,
        reportDocuments: req.body.reportDocuments,
      });
  


      Report.createReport(newReport)
      .then(data => {
        return res.status(200).json({ success: "Success",  data});
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({success: "not success"});
      });


    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: "not success",error   });
    }
  };
  



//get Reports list 
exports.getReportPatientById = async function (req, res) {
    const patientId = req.body.patientId;
    console.log(patientId,"patient id")

    try {
        const gotReports = await Report.getReportByPatientId(patientId);
        if (!gotReports) {
            return res.status(404).json({ error: "Reports not found" });
        }
        res.status(200).json(gotReports);
        
    } catch (error) {
        console.error("Error getting user by ID:", error);
        res.status(500).json({ error: "Internal Server Error in fetching" });
    }
  };

  //get by Report Id 
  exports.getReportById = async function (req, res) {
    // const patientId = req.body.patientId;
    const reportId = req.body.reportId;
  
      try {
          // console.log('req id',userId)
          const isReport = await Report.getReportById(reportId);
          if (!isReport) {
              return res.status(404).json({ error: "Report not found" });
          }
          res.status(200).json(isReport);
          
      } catch (error) {
          console.error("Error getting user by ID:", error);
          res.status(500).json({ error: "Internal Server Error in fetching" });
      }
      
    };
  
    // Handle updating a Report by ID
// exports.updateReport = async (req, res) => {
//     try {
//         // Get the existing report by ID
//         const existingReport = await Report.getReportById(req.params.reportId);

//         if (!existingReport) {
//             return res.status(404).json({ error: "Report not found" });
//         }

//         // Prepare the updated report data from the request body
//         const updatedReportData = {
//             ...existingReport, // Keep existing data
//             ...req.body,      // Update with new data from request body
//         };

//         // Handle image upload, if an image is provided
//         if (req.file && req.file.path) {
//             const imgUpload = await cloudinary.uploader.upload(
//                 req.file.path,
//                 { folder: "report_docs" }
//             );
//             updatedReportData.reportImage = imgUpload.secure_url;
//         }

//         // Update the report with the updated data
//         const result = await Report.editReport(req.params.reportId, updatedReportData);

//         // Get the updated report
//         const updatedReport = await Report.getReportById(req.params.reportId);

//         res.status(200).json({ message: result.message, updatedReport });
//     } catch (error) {
//         console.error("Error updating report:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// Handle updating a Patient by ID
exports.updateReport = async (req, res) => {
// 
    try {
      const imgUpload = await cloudinary.uploader.upload(
        req.file.path,
        { folder: "report_docs" }
      );
    //   console.log(imgUpload.secure_url);
     
    //  console.log(imgUpload,"llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
    //   
    let {reportId, ...Report1} = req.body;
    // console.log(reportId,'reportId',Report1,'Report1')

    const existingRecord = await Report.getReportById(reportId); 
    // 
    const Reportx = new Report({
        patientId: Report1.patientId || existingRecord.patientId,
        updatedDateTime: Report1.updatedDateTime || existingRecord.updatedDateTime,
        heartRate: Report1.heartRate || existingRecord.heartRate,
        bloodGroup: Report1.bloodGroup || existingRecord.bloodGroup,
        height: Report1.height || existingRecord.height,
        weight: Report1.weight || existingRecord.weight,
        disease: Report1.disease || existingRecord.disease,
        reportImage: imgUpload ? imgUpload.secure_url : existingRecord.reportImage,
        treatments: Report1.treatments || existingRecord.treatments,
        reportDocuments: Report1.reportDocuments || existingRecord.reportDocuments,
    });
    
    
    console.log(Reportx,"fffffffffffffffffffffffffffffffffff") ;
    

    if(parseInt(reportId)===existingRecord.reportId){
        try {
            // console.log("Reportx",Reportx)

            const result = await Report.editReport(reportId,Reportx);
            // console.log("result",result)
            let updatedPatient = await Report.getReportById(reportId);
            // console.log("reportId",reportId)
            res.status(200).json({ message: result.message,updatedPatient });
        } catch (error) {
            console.error("Error updating user:");
            res.status(500).json({ error: "Internal Server Error" });
        }
    }else{
        console.log(error)
        return res.status(404).json({ error: "Report not found" });
    };
}catch{console(error)};
};


// Delete a report by ID
exports.deleteReport = async (req, res) => {
    try {
        const reportId = req.body.reportId; 
        
        if (reportId === undefined || reportId === null) {
            return res.status(400).json({ error: "reportId is required" });
        }

        const existingRecord = await Report.getReportById(reportId); 
        
        if (!existingRecord) {
            return res.status(404).json({ error: "Report not found" });
        }
        else{const result = await Report.deleteReport(reportId);
        res.status(200).json({ message: "Report deleted successfully" ,result:result});
    }
    } catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


//  delete All reports for patient ID
exports.deleteAllReport = async (req, res) => {
    voidVal = true;
    let patientId = req.body.patientId;
    
    const existingRecord = await exports.getReportById(req, res); 

    if (patientId === null){
        console.log("patientId = Undefoned"); 
        return res.status(404).json({ error: "patient not found" });
    }else if (patientId == parseInt(existingRecord.patientId)){
        console.log("patientId is defoned",patientId)
        try {
            const result = await Report.deleteAllReports(patientId);
            res.status(200).json({ message: result.message });
        } catch (error) {
            console.error("Error deleting reports:", error);
            res.status(500).json({ error: "Internal Server Error" });
        };
    }

    voidVal = false; 
    return patientId;
};