// auth.js {controller}

const Router = require("express").Router();
// const bcrypt = require('bcryptjs');
// const hash = bcrypt.hashSync('somePassword', bcrypt.genSaltSync(10));
const db = require('../controllers/users');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

/* Register a user */
Router.post("/register", async (req, res) => {
	const { body } = req;
  
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  console.log("hashedPassword", hashedPassword);

  if (!body.hasOwnProperty('email')) {
    return res.status(400).json({ error: 'you must supply a field "email" when registering.' });
  }

  if (!body.hasOwnProperty('password')) {
    return res.status(400).json({ error: 'you must supply a field "password" when registering.' });
  }

  const { email, display_name, zipcode } = body;
  try {
    db.registerUser(email, display_name, zipcode, hashedPassword).then( id => {
      // create a token
      const token = jwt.sign({ id: id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).json({ auth: true, token: token }); 
      
    })
	}
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'There was a problem registering the user.' });
  }
});


Router.get('/me', async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    res.status(200).send(decoded); /* decoded contains user id */
  });
});


module.exports = Router; /* export Router */