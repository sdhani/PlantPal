
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments(); // id PK serial
    table.string('username').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};