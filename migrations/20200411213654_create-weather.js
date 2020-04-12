exports.up = function(knex) {
  return knex.schema.createTable('weather', (table) => {
    table.string('zipcode', 5).notNullable().primary(); /* PK */
    table.decimal('day_max_temp', 5, 2); /* Length, Precision might be off */
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
