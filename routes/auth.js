// routes/auth.js
// type check needed for all entries

const Router = require("express").Router();
const db = require('../controllers/users');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


/* needs user email already exists check */
/* Register a user */
Router.post("/register", async (req, res) => {
  const { email, display_name, zipcode, password } = req.body;

  if (!req.body.hasOwnProperty('email') || typeof email !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "email" of type string when registering.' });
  }

  if (!req.body.hasOwnProperty('password')|| typeof password !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "password" of type string when registering.' });
  }

  db.checkEmail(email).then(response => {
    if(response.length > 0){
      return res.status(200).json({ error: 'Email already exists on server.' })
    }
  })

  const hashedPassword = bcrypt.hashSync(password, 8);
  try {
    db.registerUser(email, display_name, zipcode, hashedPassword).then(id => {
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


/* GET current user */
Router.get('/me', async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token || token === '') {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    try {
      db.getUserByID(decoded.id[0].id).then(me => { res.status(200).send(me); });
    }
    catch(err) { console.log(err); }
  });
});


/* Login user */
Router.post('/login', async(req, res) => {
  const { email, password } = req.body;

  if (!req.body.hasOwnProperty('email') || typeof email !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "email" of type string to login' });
  }

  if (!req.body.hasOwnProperty('password') || typeof password !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "password" of type string to login' });
  }

  try {   
    db.checkEmail(email).then(dbPassword => { 
      if(dbPassword.length === 0) {
        return res.status(400).json({ error: 'The "email" provided does not exist.' });
      }

      const passwordIsValid = bcrypt.compareSync(password, dbPassword[0].password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

      db.loginUser(email,dbPassword[0].password).then(id => {
        const token = jwt.sign({ id: id}, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      });   
    });
  } catch(err) { console.log(err); }
});


/* NOTE: Client side must destroy token in cookies */
/* Logout user */
Router.get('/logout', async (req, res) => {
  res.status(200).send({ auth: false, token: null });
});


module.exports = Router; /* export Router */