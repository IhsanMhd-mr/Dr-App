const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());
// import variables from .env file
const dotenv = require( 'dotenv');
dotenv.config() ;

const { sign , verify } = require('jsonwebtoken');


exports.createToken = (email , id ,time='3d') => {
    const accessToken = sign({ email : email , id:id},
        "ACCESS_TOKEN_SECRET",
        { expiresIn: time}
        );
    return accessToken;
}

exports.validateToken = (req, res, next) => {
  try{
  const accessToken = req.headers.authorization ||"bearer "+ req.cookies.accessToken;
  // console.log("Received AccessToken:", accessToken);
  // console.log("Received req.cookies.accessToken:", req.cookies.accessToken);
  if (accessToken) {
    const token = accessToken.split(' ')[1]; // Remove "Bearer " prefix
    // console.log("Received AccessToken:", token,"vs","ACCESS_TOKEN_SECRET");
  

  // console.log("Received AccessToken:", accessToken);
  if (token) {
    verify(token, "ACCESS_TOKEN_SECRET", (error, decoded) => {
      if (error) {
          // console.error("Token Verification Error:", error);
          res.status(403).json({ message: 'Access denied!' });
      } else {
          req.user = true;
          next();
      }
    });
  }
}else {
    res.status(401).json({ message: ' User Access required' });
  }}catch{res.status(401).json({ message: ' User Access required' });}
};

exports.loginDoctor = (req,res,next)=>{
  console.log("dr")
}
