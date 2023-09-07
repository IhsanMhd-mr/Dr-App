const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController.js');
const imageController = require('../controllers/imageController.js');
const upload = require("../lib/multer");
const jwt = require('../config/JWT.js');

console.log("patients route")

router.post('/register', patientController.register);
router.put('/img/:patientId',upload.single('imgFile'), imageController.imgUpload);
router.get('/list', patientController.getAll);
router.get('/byName',patientController.getPatientByName)
router.get('/byId/:patientId', patientController.getPatientById);
router.put('/editPatient/:patientId', patientController.editPatient);
router.delete('/deletePatient/:patientId', patientController.deletePatient);
// router.put('/editPatient', jwt.validateToken, patientController.editPatient);
// router.delete('/deletePatient',jwt.validateToken, patientController.deletePatient);

module.exports = router;