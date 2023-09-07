const mysql = require ('mysql2');

// import variables from .env file
const dotenv = require( 'dotenv');
dotenv.config() ;

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DTABASE
}).promise();

  
module.exports = pool;
