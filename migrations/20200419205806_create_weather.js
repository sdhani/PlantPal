/* migrations/[...]_create_weather.js */

exports.up = function(knex) {
  return knex.schema.createTable('weather', (table) => {
    table.increments('id'); // PK
    table.integer('location_id').references('id').inTable('location'); // FK
    table.integer('user_id').references('id').inTable('users'); // FK 
    table.string('zipcode', 5); 
    table.decimal('day_max_temp', 5, 2); 
    table.decimal('day_min_temp', 5, 2); 
    table.decimal('day_total_rain', 5, 2); 
    table.decimal('forcast1_max_temp', 5, 2); 
    table.decimal('forcast1_min_temp', 5, 2); 
    table.decimal('forcast1_total_rain', 5, 2); 
    table.decimal('forcast2_max_temp', 5, 2); 
    table.decimal('forcast2_min_temp', 5, 2); 
    table.decimal('forcast2_total_rain', 5, 2); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('weather');
};