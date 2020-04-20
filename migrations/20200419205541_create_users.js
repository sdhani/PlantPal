/* migrations/[...]_create_users.js */

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 50); // PK 
    table.string('display_name'); 
    table.integer('zipcode');
    table.string('password');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
