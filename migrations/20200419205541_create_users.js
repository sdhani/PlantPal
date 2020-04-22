/* migrations/[...]_create_users.js */

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id'); // PK 
    table.string('email', 50); 
    table.string('display_name'); 
    table.integer('zipcode');
    table.string('password');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
