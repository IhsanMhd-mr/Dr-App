const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController.js');
const jwt = require('../config/JWT.js');




router.post('/doctor', doctorController.loginDoctor);
router.post('/doctorout', doctorController.logoutDoctor);
module.exports = router;

