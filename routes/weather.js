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

/* Get current weather for a zipcode */
Router.get('/current', (req, res) => {
    let zip = req.query.zip;
    try {
        db.getCurrentWeatherByZip(zip).then(weather => {
        res.status(200).json(weather);
        }); 
    } catch (err) {
      res.status(500).json({ message: "Can't get weather"})
    }
});

/* Get Weekly rain for a zipcode */
Router.get('/rain', (req, res) => {
    let zip = req.query.zip;
    try {
        db.getWeekTotalRain(zip).then(weather => {
        res.status(200).json(weather);
        }); 
    } catch (err) {
      res.status(500).json({ message: "Can't get weather"})
    }
});

/* Get tomorrow's forcast for a zipcode */
Router.get('/forcast1', (req, res) => {
    let zip = req.query.zip;
    try {
        db.getTomorrowsForcast(zip).then(weather => {
        res.status(200).json(weather);
        }); 
    } catch (err) {
      res.status(500).json({ message: "Can't get weather"})
    }
});

/* Get day after tomorrow's forcast for a zipcode */
Router.get('/forcast2', (req, res) => {
    let zip = req.query.zip;
    try {
        db.getOvermorrowsForcast(zip).then(weather => {
        res.status(200).json(weather);
        }); 
    } catch (err) {
      res.status(500).json({ message: "Can't get weather"})
    }
});

/* Add zipcode to weather table */
Router.put('/', async (req, res) => {
    const { zipcode } = req.body;
    if (!req.body.hasOwnProperty('zipcode') || typeof zipcode !== 'string' || zipcode === undefined || zipcode.length != 5) {
        return res.status(400).json({ message: ` "zipcode" must be a valid, 5 digit zipcode! ` });
      }
    else {
        db.checkWeatherZip(zipcode).then(response => {
            if(response.length > 0){
              return res.status(400).json({ message: "Zipcode already exists on server." })
            } else {
                try {
                    db.addWeather(zipcode).then(res.status(200).json({success: true}));
                } catch (err) {
                    res.status(500).json({ message: "Unable to add zipcode to weather"});
                }
            }
        })
    }
});

module.exports = Router; /* export Router */



