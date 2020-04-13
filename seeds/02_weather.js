
const weather = require('../seedData/weather');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('weather').del()
    .then(function () {
      // Inserts seed entries
      return knex('weather').insert(weather);
    });
};