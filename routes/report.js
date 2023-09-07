const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController.js');
const upload = require("../lib/multer");

console.log("report route")

router.post('/add',upload.single("reportImage"), reportController.createReport);
router.get('/list_reports', upload.none(),reportController.getReportPatientById);
router.get('/reportbyId',upload.none(), reportController.getReportById);
router.put('/updateReport',upload.single("reportImage"), reportController.updateReport);
router.delete('/deleteReport',upload.none(), reportController.deleteReport);
// router.delete('/deleteReportslist',upload.none(), reportController.deleteAllReport);
// router.put('/editReport', jwt.validateToken, reportController.);
// // router.delete('/deleteReport',jwt.validateToken, reportController.);

module.exports = router;