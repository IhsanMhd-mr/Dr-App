const express = require('express');
const app = express();

const dotenv = require( 'dotenv');
dotenv.config() ;


const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('./config/JWT.js');




// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//  API routes
app.use('/patients', require('./routes/patients.js'));
app.use('/doctors', require('./routes/doctor.js'));
app.use('/reports', require('./routes/report.js'));
// app.use('/reports', jwt.validateToken, require('./routes/report.js'));
app.use('/login', require('./routes/login.js'));




// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });