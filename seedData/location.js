module.exports = [
  {
    weather_zipcode: 10000,
    state: "New York",
    // latitude:,
    // longitude:,
  },
  {
    weather_zipcode: 10000,
    state: "New York",
    // latitude:,
    // longitude:,
  },
]

/* Location's Schema
  // PK+FK
  table.string('weather_zipcode', 5).unsigned().notNullable().primary().references('zipcode').inTable('weather');   table.string('city');
  table.string('state');
  table.decimal('latitude', 9, 6);
  table.decimal('longitude', 9, 6);
 */