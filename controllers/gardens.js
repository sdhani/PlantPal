const knex = require('./knex'); // the connection

module.exports = {
  getAllUserGardens(user_id){
    return knex('gardens')
    .where('user_id', user_id)
    .orderBy('id')
  },

  getGardenByID(user_id, id){
    return knex('gardens')
    .where('id', id)
    .where('user_id', user_id)
  },

  /* Needs to check user */
  getAllPlantsFromGarden(user_id, garden_id){
    return knex('plants')
    .where('garden_id', garden_id)
    .where('user_id', user_id)
    .orderBy('id')
  },

  createGarden(garden_name, user_id){
    return knex('gardens')
    .insert({ 
      garden_name,
      user_id
    })
  },

  updateGardenByID(user_id, id, garden_name){
    return knex('gardens')
    .where('id', id)
    .where('user_id', user_id)
    .update({garden_name: garden_name})
  },

  deleteGardenByID(user_id, id){
    return knex('gardens')
    .where('id', id)
    .where('user_id', user_id)
    .del();
  },
};