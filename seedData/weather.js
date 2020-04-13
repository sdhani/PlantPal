module.exports = [
  {
    zipcode: 10000,
    day_max_temp: 80.00,
    day_min_temp: 40.00,
    day_total_rain: 1.00,
    forcast1_max_temp: 90.00, 
    forcast1_min_temp: 30.00,
    forcast1_total_rain: 2.00, 
    forcast2_max_temp: 70.00, 
    forcast2_min_temp: 50.00, 
    forcast2_total_rain: 0.00, 
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