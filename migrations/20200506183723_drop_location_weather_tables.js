/* migrations/[...]_recreate_weather.js */

exports.up = function(knex) {
    return knex.schema.dropTable('weather');
    return knex.schema.dropTable('location');
};

exports.down = function(knex) {
    return knex.schema.createTable('location', (table) => {
        table.increments('id'); // PK 
        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE'); // FK 
        table.string('weather_zipcode', 5);
        table.string('city');
        table.string('state');
        table.decimal('latitude', 9, 6);
        table.decimal('longitude', 9, 6);
      });
    return knex.schema.createTable('weather', (table) => {
        table.increments('id'); // PK
        table.integer('location_id').references('id').inTable('location').onDelete('CASCADE'); // FK
        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE'); // FK 
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
