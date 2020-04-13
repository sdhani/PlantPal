module.exports = [
  {
    email: "someCoolPeople@coolpeople.com",
    display_name: "CoolPeople308",
    weather_zipcode: 10000
  },
  {
    email: "plantFolks@farmers.com",
    display_name: "plantFolks43",
    weather_zipcode: 10000
  },
  {
    email: "fernGreenery@leafs.com",
    display_name: "fernGreenery23",
    weather_zipcode: 10000
  },
  {
    email: "waterEarth@nature.com",
    display_name: "waterEarth90",
    weather_zipcode: 10000
  },
]

/* Users Schema
    table.string('email', 50).notNullable().primary(); // PK 
    table.string('display_name'); // Nullable 
    table.string('weather_zipcode', 5).unsigned().notNullable().references('zipcode').inTable('weather'); // FK 
*/