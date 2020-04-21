/* migrations/[...]_create_gardens.js */

exports.up = function(knex) {
  return knex.schema.createTable('gardens', (table) => {
    table.increments('id'); // PK 
    table.string('garden_name'); 
    table.integer('user_id').references('id').inTable('users'); // FK 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('gardens');
};
