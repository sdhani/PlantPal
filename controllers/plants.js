const knex = require("./knex"); // the connection

module.exports = {
  getAllPlantsFromUser(user_id) {
    return knex("plants").where("user_id", user_id);
  },

  getPlantByID(user_id, id) {
    return knex("plants")
      .where("user_id", user_id)
      .where("id", id);
  },

  addPlant({
    garden_id = null,
    user_id = null,
    common_name = null,
    outdoor_plant = null,
    scientific_name = null,
    trefle_id = null,
    duration = null,
    last_watered = null,
    images = null,
    foliage = null,
    fruit_or_seed = null,
    growth = null,
    seed = null,
    specifications = null,
    family_common_name = null
  }) {
    return knex("plants").insert({
      garden_id,
      user_id,
      common_name,
      scientific_name,
      trefle_id,
      duration,
      outdoor_plant,
      last_watered,
      images,
      foliage,
      fruit_or_seed,
      growth,
      seed,
      specifications,
      family_common_name
    });
  },

  updatePlant(id, garden_id, outdoor_plant, user_id, images, last_watered) {
    return knex("plants")
      .where("id", id)
      .where("user_id", user_id)
      .update({
        garden_id,
        outdoor_plant,
        images,
        last_watered
      });
  },

  deletePlant(user_id, id) {
    return knex("plants")
      .where("id", id)
      .where("user_id", user_id)
      .del();
  }
};
