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
    })
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