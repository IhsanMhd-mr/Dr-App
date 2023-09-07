const rep_query = require('../repo/rep_query.js');
const jwt = require('../config/JWT.js');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());
// class Report {
//   constructor(ReportData) {
//     this.patientId = ReportData.patientId;
//     this.updatedDateTime = ReportData.updatedDateTime;
//     this.heartRate = ReportData.heartRate;
//     this.bloodGroup = ReportData.bloodGroup;
//     this.height = ReportData.height;
//     this.weight = ReportData.weight;
//     this.disease = ReportData.disease;
//     this.reportImage = ReportData.reportImage;
//     this.treatments = ReportData.treatments;
//     this.reportDocuments = ReportData.reportDocuments;
//   }
// }


const Report = function (ReportData) {
    this.patientId = ReportData.patientId, 
    this.updatedDateTime = ReportData.updatedDateTime,     
    this.heartRate = ReportData.heartRate, 
    this.bloodGroup = ReportData.bloodGroup, 
    this.height = ReportData.height, 
    this.weight = ReportData.weight, 
    this.disease = ReportData.disease, 
    this.reportImage = ReportData.reportImage, 
    this.treatments = ReportData.treatments, 
    this.reportDocuments = ReportData.reportDocuments
  };
  



Report.createReport = async (Report) => {
  try {
    const addResults = await rep_query.addReport(Report);
    console.log(addResults,"results added");
    return { message: "Report Created successfully" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

Report.editReport = async (reportId,Report) => {
  try {
    const existingReport = await rep_query.getReportById(reportId);
    console.log(existingReport,"existingReport")
    if (existingReport ) {
      console.log(Report,"puuuuuuuuuuuuuuuuuuuuuuuuuunnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnddddddddddddddddddddddddaaaaaaaaaaaaa")
      await rep_query.updateReportById(reportId,Report); // Check query ==>>>
      return { message: "Report Updated Successfully" };
    } else {
      return { message: "Patient not found!" };
    }
  } catch (error) {
    console.log(error,"in service")
    throw error;
  }
};

Report.deleteReport = async (reportId) => {
    try {
      const existingReport = await rep_query.getReportById(reportId);
      console.log(existingReport);
      if (existingReport) {
        await rep_query.deleteReport(reportId);
        return { message: "Report Deleted Successfully" };
      }else{
        return { message: "Report not found!" };
      }
    } catch (error) {
      throw error;
    }
  };

Report.deleteAllReports = async (reportId) => {
    try {
      const existingReport = await rep_query.getReportById(reportId);
      if (existingReport) {
        await rep_query.deleteAllReports(reportId);
        return { message: "Reports Deleted Successfully" };
      }else{
        return { message: "Reports not found!" };
      }
    } catch (error) {
      throw error;
    }
  };
// list of reports
Report.getReportByPatientId = async (PatientId) => {
    try {
      const existingReports = await rep_query.getReportByPatientId(PatientId);
      return existingReports;
    } catch (error) {
      throw error;
    }
  };
// one report by specific report id
Report.getReportById = async (reportId) => {
    try {
      const existingReports = await rep_query.getReportById(reportId);
      return existingReports;
    } catch (error) {
       throw error;
    }
};


module.exports = Report;
