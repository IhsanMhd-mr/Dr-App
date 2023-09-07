

const { sign , verify } = require('jsonwebtoken');

exports.createToken = (name , role , type , id) => {
    const accessToken = sign({ name : name , role : role , type :type , id:id},
        "JWT_SECRET"
        );
    return accessToken;
}

exports.validateToken = (req, res, next) => {
  const accessToken = req.headers.authorization || req.cookies.accessToken;

  if (accessToken) {
    verify(accessToken, "JWT_SECRET", (error, decoded) => {
      if (error) {
          res.status(401).json({ message: 'Access denied!' });
      } else {
          req.user = true;
          next();
      }
    });
  } else {
    res.status(401).json({ message: ' User Access required' });
  }
};
