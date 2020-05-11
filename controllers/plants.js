const knex = require('./knex'); // the connection

module.exports = {
  getAllPlantsFromUser(user_id) {
    return knex('plants')
    .where('user_id', user_id)
  },

  getPlantByID(user_id, id) {
    return knex('plants')
    .where('user_id', user_id)
    .where('id', id)
  },

  addPlant(user_id, garden_id, common_name, scientific_name, trefle_id, duration, outdoor_plant, images, foliage, fruit_or_seed, growth, seed, specifications, family_common_name, name) {
    return knex('plants')
    .insert({ 
      user_id, garden_id, common_name, scientific_name, trefle_id, duration, outdoor_plant, images, foliage, fruit_or_seed, growth, seed, specifications, family_common_name, name
    })
  },

  updatePlant(id, garden_id, outdoor_plant, user_id, images, last_watered, name) {
    return knex('plants')
    .where('id', id)
    .where('user_id', user_id)
    .update({ 
     garden_id,
     outdoor_plant,
     images,
     last_watered, 
     name
    })
  },  

  deletePlant(user_id, id) {
    return knex('plants')
    .where('id', id)
    .where('user_id', user_id)
    .del();
  },
};