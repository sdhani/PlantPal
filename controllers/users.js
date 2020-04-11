const knex = require('./knex'); // the connection

module.exports = {
  getAllUsers() {
    return knex('users');
  },

  loginUser(username) {
    return knex('users')
    .where('username', username)
    .then(function(rows) {
      if (rows.length === 0){
        return -1;
      } else {
        return knex('users').select('id').where('username', username);
      }
    });
  },

  registerUser(username) {
    return knex('users')
    .where('username', username)
    .then(function(rows) {
      if (rows.length === 0){
        return knex('users').insert({username: username});
      } else {
        return -1; /* Explore new Error("Username already exists") */
      }
    });
  }
};