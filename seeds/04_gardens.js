
const gardens = require('../seedData/gardens');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('gardens').del()
    .then(function () {
      // Inserts seed entries
      return knex('gardens').insert(gardens);
    });
};