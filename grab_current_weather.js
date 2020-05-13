const request = require('request');
const {
    Client
} = require('pg');

// global variables to be used in api calls
const connectionString = process.env.DATABASE_URL;
const units = process.env.OWEATHER_UNITS;
const apiKey = process.env.OWEATHER_TOKEN;

// variables that change with each api call
var zipcode;
var lat;
var lon;

// variables to write into table (using weather description only for now for testing)
var descr;

// set db connection parameters
const db = new Client({
    connectionString: connectionString
});
db.connect();

db.query('SELECT zipcode FROM weather', (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        for (let i = 0, p = Promise.resolve(); i < res.rows.length; i++) {
            p = p.then(_ => new Promise(resolve =>
                setTimeout(function () {
                    zipcode = res.rows[i].zipcode;
                    getWeather();
                    resolve();
                }, Math.random() * 1000)
            ));
        }
    }
});

// not a great solution, but couldn't figure out a db.connection promise
setTimeout(killConnection, 60000);

function killConnection() {
    db.end();
};

function getWeather() {
    zip = zipcode;
    let weather_url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=${units}&appid=${apiKey}`;
    console.log(zipcode);

    request(weather_url, function (err, response, body) {
        if (err) {
            console.log('error:', error);
        } else {
            var forcast = JSON.parse(body);
            current_temp = `${forcast.main.temp}`;
            description = `${forcast.weather[0].description}`;
            if (forcast.hasOwnProperty("rain")) {
                rain = `${forcast.rain["1h"]}`;
            } else {
                rain = '0.00';
            }
            db.query("UPDATE weather SET day_current_temp = '" + current_temp + "', weather_description = '" + description + "',  hourly_rain = '" + rain + "' WHERE zipcode = '" + zipcode + "'", (err, res) => {
                if (err)
                    console.log(err.stack);
            });
        }
    });
};