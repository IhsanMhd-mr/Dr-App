const express = require('express');
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());


const dotenv = require( 'dotenv');
dotenv.config() ;


const bodyParser = require('body-parser');
const path = require('path');




// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//  API routes
app.use('/login', require('./routes/login.js'));




// Start the server
const AUTH_PORT = process.env.AUTH_PORT;
app.listen(AUTH_PORT, () => {
    console.log(`Server started on http://localhost:${AUTH_PORT}`);
  });