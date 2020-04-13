module.exports = [
  {
    zipcode: "BUBBLES",
    day_max_temp:,
    day_min_temp:,
    day_total_rain:,
    forcast1_max_temp:, 
    forcast1_min_temp:,
    forcast1_total_rain:, 
    forcast2_max_temp:, 
    forcast2_min_temp:, 
    forcast2_total_rain:, 
  },
  {
    zipcode: "BUBBLES",
    day_max_temp:,
    day_min_temp:,
    day_total_rain:,
    forcast1_max_temp:, 
    forcast1_min_temp:,
    forcast1_total_rain:, 
    forcast2_max_temp:, 
    forcast2_min_temp:, 
    forcast2_total_rain:, 
  },
]

/* Weather Schema
table.string('zipcode', 5).notNullable().primary(); // PK 
table.decimal('day_max_temp', 5, 2); // Length, Precision might be off
table.decimal('day_min_temp', 5, 2); 
table.decimal('day_total_rain', 5, 2); 
table.decimal('forcast1_max_temp', 5, 2); 
table.decimal('forcast1_min_temp', 5, 2); 
table.decimal('forcast1_total_rain', 5, 2); 
table.decimal('forcast2_max_temp', 5, 2); 
table.decimal('forcast2_min_temp', 5, 2); 
table.decimal('forcast2_total_rain', 5, 2); 
*/