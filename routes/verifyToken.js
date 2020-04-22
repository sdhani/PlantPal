/* routes/verifyToken */
const jwt = require('jsonwebtoken');
const config = require('../config');

verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if(!token){
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err) { 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }); 
    }

    req.user_id = decoded.id[0].id; /* current user_id */
    next();
  });
}

module.exports = verifyToken;