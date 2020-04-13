module.exports = [
  {
    garden_name: "Edible Plants",
    users_email: "someCoolPeople@coolpeople.com",
    plants_plant_id: 1,
  },
  {
    garden_name: "Kitchen Plants",
    users_email: "plantFolks@farmers.com",
    plants_plant_id: 2,
  },
  {
    garden_name: "Patio Plants",
    users_email: "someCoolPeople@coolpeople.com",
    plants_plant_id: 3,
  },
  {
    garden_name: "Flowers",
    users_email: "plantFolks@farmers.com",
    plants_plant_id: 4,
  },
  {
    garden_name: "Special Care Plants",
    users_email: "fernGreenery@leafs.com",
    plants_plant_id: 5,
  },
]

/* Gardens' Schema
 table.string('garden_name').notNullable().primary(); // PK
 table.string('users_email', 50).references('email').inTable('users'); // FK
 table.integer('plants_plant_id').unsigned().notNullable().references('plant_id').inTable('plants'); // FK 

 */