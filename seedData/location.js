module.exports = [
  {
    weather_zipcode: 10000,
    state: "New York",
    latitude: 40.712776,
    longitude: -74.005974,
  }
]

/* Location's Schema
  // PK+FK
  table.string('weather_zipcode', 5).unsigned().notNullable().primary().references('zipcode').inTable('weather');   table.string('city');
  table.string('state');
  table.decimal('latitude', 9, 6);
  table.decimal('longitude', 9, 6);
 */