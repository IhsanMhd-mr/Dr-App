const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController.js');
const jwt = require('../config/JWT.js');

// console.log("doctor route")

router.post('/register', doctorController.register);
router.get('/list', doctorController.getAll);
// router.get('/byId', doctorController.getDocById);

module.exports = router;