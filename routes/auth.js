// routes/auth.js
const Router = require("express").Router();
const db = require('../controllers/users');
const VerifyToken = require('./verifyToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config'); /* stores jwt secret */


/* Register new user */
Router.post("/register", async (req, res) => {
  const { email, display_name, zipcode, password } = req.body;

  if (!req.body.hasOwnProperty('email') || typeof email !== 'string' || email === undefined) {
    return res.status(400).json({ error: 'you must supply a field "email" of type string when registering.' });
  }

  if (!req.body.hasOwnProperty('password')|| typeof password !== 'string' || password === undefined) {
    return res.status(400).json({ error: 'you must supply a field "password" of type string when registering.' });
  }

  await db.checkEmail(email).then(response => {
    if(response.length > 0){
      return res.status(400).json({ error: 'Email already exists on server.' })
    } else {
      const hashedPassword = bcrypt.hashSync(password, 8);
      try {
        db.registerUser(email, display_name, zipcode, hashedPassword).then(id => {
          // create a token[]
          const newID = [ { id: id[0]} ]
          const token = jwt.sign({ id: newID }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).json({ auth: true, token: token }); 
        })
      }
      catch (err) { res.status(500).json({ error: 'There was a problem registering the user.' }); }
    }
  })

});

/* Get current user */
Router.get('/me', VerifyToken, async (req, res) => {  
  const { user_id } = req;

  try {
    await db.getUserByID(user_id).then(me => { res.status(200).send(me); });
  }
  catch(err) { 
    res.status(500).json({ error: 'There was a problem getting the current user\'s info.' }); 
  }
});


/* Login user */
Router.post('/login',  async(req, res) => {
  const { email, password } = req.body;

  if (!req.body.hasOwnProperty('email') || typeof email !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "email" of type string to login' });
  }

  if (!req.body.hasOwnProperty('password') || typeof password !== 'string') {
    return res.status(400).json({ error: 'you must supply a field "password" of type string to login' });
  }

  try {   
    await db.checkEmail(email).then(dbPassword => { 
      if(dbPassword.length === 0) {
        return res.status(400).json({ error: 'The "email" provided does not exist.' });
      }

      const passwordIsValid = bcrypt.compareSync(password, dbPassword[0].password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

      await db.loginUser(email,dbPassword[0].password).then(id => {
      console.log("ID in login", id)

        const token = jwt.sign({ id: id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      });   
    });
  } catch(err) { res.status(500).json({ auth: false, token: null }); }
});


/* Logout user */
Router.get('/logout', async (req, res) => {
  /* NOTE: Client side must destroy token in cookies */
  res.status(200).send({ auth: false, token: null });
});


module.exports = Router; /* export Router */
