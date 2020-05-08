const knex = require('./knex'); // the connection

module.exports = {
  getAllWeather() {
    return knex('weather');
  }
};

