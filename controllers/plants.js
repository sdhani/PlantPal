const knex = require('./knex'); // the connection

module.exports = {
  getAllPlantsFromUser(user_id){
    return knex('plants')
    .where('user_id', user_id)
  },

  addPlant(user_id, garden_id, common_name, scientific_name, trefle_id, duration, outdoor_plant, images, foliage, fruit_or_seed, growth, seed, specifications, family_common_name){
    return knex('plants')
    .insert({ 
      user_id, garden_id, common_name, scientific_name, trefle_id, duration, outdoor_plant, images, foliage, fruit_or_seed, growth, seed, specifications, family_common_name
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