/* migrations/[...]_recreate_weather.js */

exports.up = function(knex) {
    return knex.schema.createTable('weather', (table) => {
        table.increments('id'); // PK
        table.string('zipcode'); // Use join to pair zips 
        table.decimal('day_max_temp', 5, 2); 
        table.decimal('day_min_temp', 5, 2);
        table.decimal('day_current_temp', 5, 2);
        table.string('weather_description'); 
        table.decimal('day_total_rain', 5, 2);
        table.decimal('week_total_rain', 5, 2); 
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
