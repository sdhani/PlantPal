/* routes/weather.js */
const Router = require("express").Router();
const db = require('../controllers/weather');
const VerifyToken = require('./verifyToken');

/* Get all weather */
Router.get("/", async (req, res) => {
  try {
    db.getAllWeather().then(weather => {
    res.status(200).json(weather);
    });
  }
  catch(err) { res.status(500).json({ error: 'Unable to get all weather.' }); }
});

module.exports = Router; /* export Router */