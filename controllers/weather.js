const knex = require('./knex'); // the connection

module.exports = {
  getAllWeather() {
    return knex('weather');
  },

  addWeather(zipcode) {
    return knex('weather')
    .insert({
      zipcode, 
    }).returning('id')
  },

  getCurrentWeatherByZip(zip) {
    return knex('weather')
    .select('zipcode', 'day_max_temp','day_min_temp', 'day_current_temp', 'weather_description', 'day_total_rain')
    .where('zipcode', zip)
  },

  getWeekTotalRain(zip) {
      return knex('weather')
      .select('zipcode', 'week_total_rain')
      .where('zipcode', zip)
  },

  getTomorrowsForcast(zip) {
      return knex('weather')
      .select('zipcode', 'forcast1_max_temp', 'forcast1_min_temp', 'forcast1_total_rain')
      .where('zipcode', zip)
  },

  getOvermorrowsForcast(zip) {
      return knex('weather')
      .select('zipcode', 'forcast2_max_temp', 'forcast2_min_temp', 'forcast2_total_rain')
      .where('zipcode', zip)
  },

  checkWeatherZip(zipcode) {
    return knex('weather')
    .select('zipcode')
    .where('zipcode', zipcode)
  },

  deleteWeather(zip) {
    return knex('weather')
    .where('zipcode', zip)
    .del()
  }
};

