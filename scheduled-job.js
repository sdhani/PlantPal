var request = require('request');
const {
	Client
} = require('pg');

// pull variables from heroku config vars
var connectionString = process.env.DATABASE_URL;
var units = process.env.OWEATHER_UNITS;
var apiKey = process.env.OWEATHER_TOKEN;

// api variables
var zipcode;
var lat;
var lon;

const db = new Client({
	connectionString: connectionString
});

function setLatLon() {
	let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=current,hourly&appid=${apiKey}`;
	request(url, function (err, response, body) {
		if (err) {
			console.log('error:', error);
		} else {
			var forcast = JSON.parse(body);
			var message = `Max Temp today is: ${forcast.daily[0].temp.max}F and Min Temp today is: ${forcast.daily[0].temp.min}F and Day Temp today is: ${forcast.daily[0].temp.day}F`;
			if (forcast.daily[1].rain !== undefined) {
				var one_day = `Max Temp tomorrow is: ${forcast.daily[1].temp.max}F and Min Temp tomorrow is: ${forcast.daily[1].temp.min}F, and tomorrow will rain: ${forcast.daily[1].rain}mm`;
			} else {
				var one_day = `Max Temp tomorrow is: ${forcast.daily[1].temp.max}F and Min Temp tomorrow is: ${forcast.daily[1].temp.min}F, and no rain tomorrow!`;
			}
			if (forcast.daily[2].rain !== undefined) {
				var two_day = `Max Temp overmorrow is: ${forcast.daily[2].temp.max}F and Min Temp overmorrow is: ${forcast.daily[2].temp.min}F, and overmorrow will rain: ${forcast.daily[2].rain}mm`;
			} else {
				var two_day = `Max Temp overmorrow is: ${forcast.daily[2].temp.max}F and Min Temp overmorrow is: ${forcast.daily[2].temp.min}F, and no rain overmorrow!`;
			}
			if (forcast.daily[3].rain !== undefined) {
				var three_day = `Max Temp fourth morrow is: ${forcast.daily[3].temp.max}F and Min Temp fourth morrow is: ${forcast.daily[3].temp.min}F, and fourth morrow will rain: ${forcast.daily[3].rain}mm`;
			} else {
				var three_day = `Max Temp fourth morrow is: ${forcast.daily[3].temp.max}F and Min Temp fourth morrow is: ${forcast.daily[3].temp.min}F, and no rain fourth morrow!`;
			}
			console.log(message);
			console.log(one_day);
			console.log(two_day);
			console.log(three_day);
		}
	})
};

function getWeather() {
	console.log(zipcode);
	zip = zipcode;
	let weather_url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=${units}&appid=${apiKey}`;

	request(weather_url, function (err, response, body) {
		if (err) {
			console.log('error:', error);
		} else {
			var forcast = JSON.parse(body);
			if (forcast.hasOwnProperty("rain")) {
				var message = `Current Temp is: ${forcast.main.temp}F, ${forcast.weather[0].description}, and an hourly rainfall of: ${forcast.rain["1h"]}mm`;
				console.log(message);
				lat = `${forcast.coord.lat}`;
				lon = `${forcast.coord.lon}`;
				setLatLon();
			} else if (forcast.hasOwnProperty("main")) {
				var message = `Current Temp is: ${forcast.main.temp}F, ${forcast.weather[0].description}`;
				console.log(message);
				lat = `${forcast.coord.lat}`;
				lon = `${forcast.coord.lon}`;
				setLatLon();
			} else {
				// do nothing, maybe write "invalid zip in weather description?"
			}
		}
	});
};

function pullZipFromDB() {
	db.connect();

	db.query('SELECT zipcode FROM weather', (err, res) => {
		if (err) {
			console.log(err.stack);
		} else {
			for (var i = 0; i < res.rows.length; i++) {
				//console.log("Row count: %d", res.rows.length);
				//console.log(res.rows[i].zipcode);
				zipcode = res.rows[i].zipcode;
				getWeather();
			}
			db.end();
		}
	});
};

pullZipFromDB();