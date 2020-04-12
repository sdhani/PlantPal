exports.up = function(knex) {
  return knex.schema.createTable('plants', (table) => {
    table.integer('plant_id').primary(); /* PK */
    table.string('common_name'); 
    table.string('scientific_name');
    table.integer('trefle_id');
    table.string('duration');
    table.boolean('outdoor_plant');
    table.json('images');
    table.json('foilage');
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
