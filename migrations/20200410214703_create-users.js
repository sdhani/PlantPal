exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('email', 50).notNullable().primary(); /* PK */
    table.string('display_name'); /* Nullable */
    table.string('weather_zipcode', 5).references('zipcode').inTable('weather'); /* FK */
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};