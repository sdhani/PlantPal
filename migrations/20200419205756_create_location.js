/* migrations/[...]_create_location.js */

exports.up = function(knex) {
  return knex.schema.createTable('location', (table) => {
    table.increments('id'); // PK 
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE'); // FK 
    table.string('weather_zipcode', 5);
    table.string('city');
    table.string('state');
    table.decimal('latitude', 9, 6);
    table.decimal('longitude', 9, 6);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('location');
};