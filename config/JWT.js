

const { sign , verify } = require('jsonwebtoken');

exports.createToken = (email , id) => {
    const accessToken = sign({ email : email , id:id},
        "ACCESS_TOKEN_SECRET"
        );
    return accessToken;
}

exports.validateToken = (req, res, next) => {
  try{
  const accessToken = req.headers.authorization || req.cookies.accessToken;
  if(accessToken==undefined){return accessToken=null}
  // console.log("Received AccessToken:", accessToken);
  if (accessToken) {
    const token = accessToken.split(' ')[1]; // Remove "Bearer " prefix
    console.log("Received AccessToken:", token);
  

  console.log("Received AccessToken:", accessToken);
  if (token) {
    verify(token, "ACCESS_TOKEN_SECRET", (error, decoded) => {
      if (error) {
          console.error("Token Verification Error:", error);
          res.status(401).json({ message: 'Access denied!' });
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
