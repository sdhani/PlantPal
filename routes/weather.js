/* routes/weather.js */
const Router = require("express").Router();
const db = require('../controllers/weather');
const VerifyToken = require('./verifyToken');

/* Get all weather */
Router.get("/", async (req, res) => {
  try {
    await db.getAllWeather().then(weather => {
      res.status(200).json(weather);
    });
  } catch (err) {
    res.status(500).json({
      error: "Unable to get all weather!"
    });
  }
});

/* Get current weather for a zipcode */
Router.get('/current', VerifyToken, async (req, res) => {
  const {
    user_id
  } = req;
  let zip;
  try {
    await db.getUserZipByID(user_id).then(zipcode => {
      zip = `${zipcode[0].zipcode}`;
      await db.getCurrentWeatherByZip(zip).then(weather => {
        res.status(200).json(weather);
      });
    });
  } catch (err) {
    res.status(500).json({
      error: "Can't get current weather!"
    })
  }
});

/* Get Weekly rain for a zipcode */
Router.get('/rain', VerifyToken, async (req, res) => {
  const {
    user_id
  } = req;
  let zip;
  try {
    await db.getUserZipByID(user_id).then(zipcode => {
      zip = `${zipcode[0].zipcode}`;
      await db.getWeekTotalRain(zip).then(weather => {
        res.status(200).json(weather);
      });
    });
  } catch (err) {
    res.status(500).json({
      error: "Can't get weekly rain!"
    })
  }
});

/* Get tomorrow's forcast for a zipcode */
Router.get('/forcast1', VerifyToken, async (req, res) => {
  const {
    user_id
  } = req;
  let zip;
  try {
    await db.getUserZipByID(user_id).then(zipcode => {
      zip = `${zipcode[0].zipcode}`;
      await db.getTomorrowsForcast(zip).then(weather => {
        res.status(200).json(weather);
      });
    });
  } catch (err) {
    res.status(500).json({
      error: "Can't get tomorrow's forcast!"
    })
  }
});

/* Get day after tomorrow's forcast for a zipcode */
Router.get('/forcast2', VerifyToken, async (req, res) => {
  const {
    user_id
  } = req;
  let zip;
  try {
    await db.getUserZipByID(user_id).then(zipcode => {
      zip = `${zipcode[0].zipcode}`;
      await db.getOvermorrowsForcast(zip).then(weather => {
        res.status(200).json(weather);
      });
    });
  } catch (err) {
    res.status(500).json({
      error: "Can't get day after tomorrow's forcast!"
    })
  }
});

/* Add zipcode to weather table */
Router.put('/', async (req, res) => {
  const {
    zipcode
  } = req.body;
  if (!req.body.hasOwnProperty('zipcode') || typeof zipcode !== 'string' || zipcode === undefined || zipcode.length != 5) {
    return res.status(400).json({
      message: ` "zipcode" must be a valid, 5 digit zipcode! `
    });
  } else {
    await db.checkWeatherZip(zipcode).then(response => {
      if (response.length > 0) {
        return res.status(200).json({
          message: "Zipcode already exists on server."
        })
      } else {
        try {
          await db.addWeather(zipcode).then(res.status(200).json({
            success: true
          }));
        } catch (err) {
          res.status(500).json({
            message: "Unable to add zipcode to weather"
          });
        }
      }
    })
  }
});

module.exports = Router; /* export Router */
