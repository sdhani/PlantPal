/* migrations/[...]_create_plants.js */

exports.up = function(knex) {
  return knex.schema.createTable('plants', (table) => {
    table.increments('id'); // PK 
    table.integer('garden_id').references('id').inTable('gardens'); // FK 
    table.integer('user_id').references('id').inTable('users'); // FK 
    table.string('common_name'); 
    table.string('scientific_name');
    table.integer('trefle_id');
    table.string('duration');
    table.boolean('outdoor_plant');
    table.json('images');
    table.json('foliage');
    table.json('fruit_or_seed');
    table.json('growth');
    table.json('seed');
    table.json('specifications');
    table.string('family_common_name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('plants');
};
