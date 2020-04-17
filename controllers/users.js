const knex = require('./knex'); // the connection

module.exports = {
  getAllUsers() {
    return knex('users');
  }

  registerUser(email, username, zipcode){
    return knex('users').where('email', email).then(function(rows){
      if (rows.length == 0){
        return knex('users').insert({email: email, display_name: username, weather_zipcode: zipcode})
      }
      else{
        return -1;
      }
    });
  },

};