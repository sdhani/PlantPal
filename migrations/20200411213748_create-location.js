exports.up = function(knex) {
  return knex.schema.createTable('location', (table) => {
    table.string('weather_zipcode', 5).notNullable().primary().references('zipcode').inTable('weather'); /* PK / FK (not sure if this is correct)*/
    table.string('city');
    table.string('state');
    table.decimal('latitude', 9, 6);
    table.decimal('longitude', 9, 6);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('location');
};
