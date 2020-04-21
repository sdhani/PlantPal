const knex = require('./knex'); // the connection

module.exports = {
  getAllUsers() {
    return knex('users');
  },

  registerUser(email, display_name, zipcode, password) {
    return knex('users')
    .insert({
      email, 
      display_name, 
      zipcode, 
      password
    }).returning('id')
  },

  getUserByID(id) {
    return knex('users')
    .select('id', 'email', 'display_name', 'zipcode')
    .where('id', id)
  },

  updateUser(id, email, display_name, zipcode, password) {
    return knex('users')
    .where('id', id)
    .update({ 
      email, 
      display_name, 
      zipcode, 
      password
    })
  },

  deleteUser(id) {
    return knex('users')
    .where('id', id)
    .del()
  }
};