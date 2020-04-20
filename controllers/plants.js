const knex = require('./knex'); // the connection

module.exports = {

  createGarden(garden_name, user_id){
    return knex('gardens')
    .insert({ 
      garden_name,
      user_id
    })
  },

  // getGardenByID(user_id, id){
  //   return knex('gardens')
  //   .where('id', id)
  //   .where('user_id', user_id)
  // },

  // updateGardenByID(user_id, id, garden_name){
  //   return knex('gardens')
  //   .where('id', id)
  //   .where('user_id', user_id)
  //   .update({garden_name: garden_name})
  // },

  // deleteGardenByID(user_id, id){
  //   return knex('gardens')
  //   .where('id', id)
  //   .where('user_id', user_id)
  //   .del();
  // },
};