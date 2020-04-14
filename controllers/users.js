const knex = require('./knex'); // the connection

module.exports = {
  getAllUsers() {
    return knex('users');
  }
};