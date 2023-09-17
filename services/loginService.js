const LoginService = require('../services/loginService.js');
const LoginRepo = require('../repo/login_query');
const jwt = require('../config/JWT.js');
// import variables from .env file
const dotenv = require( 'dotenv');
dotenv.config() 

exports.genAccesToken = async ( user )=>{
    // console.log(user)

    // Refresh function goes here.../should
    let accessToken = jwt.createToken(user,process.env.ACCESS_TOKEN_SECRET);
    // const refreshToken = jwt.loginDoctor(user, process.env.REFRESH_TOKEN_SECRET);

    
    // console.log(accessToken)
    let x = LoginRepo.addToken(user.id,accessToken)
    return accessToken;
}

exports.deleteToken = async (token) => {
    try {
      let theToken = LoginRepo.removeToken(token);
      return theToken;
    } catch (error) {
      throw error;
    }
  }
  