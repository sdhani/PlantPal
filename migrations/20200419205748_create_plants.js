/* migrations/[...]_create_plants.js */

exports.up = function(knex) {
  return knex.schema.createTable("plants", table => {
    table.increments("id"); // PK
    table
      .integer("garden_id")
      .references("id")
      .inTable("gardens")
      .onDelete("CASCADE"); // FK
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // FK
    table.string("common_name");
    table.string("name");
    table.string("scientific_name");
    table.integer("trefle_id");
    table.integer("days_until_needs_water");
    table.string("duration");
    table.boolean("outdoor_plant").notNullable();
    table.date(
      "last_watered"
    ); /* Expecting input: "yyyy-mm-dd"; response format: "2020-04-01T04:00:00.000Z" */
    table.json("images");
    table.json("foliage");
    table.json("fruit_or_seed");
    table.json("growth");
    table.json("seed");
    table.json("specifications");
    table.string("family_common_name");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("plants");
};

/*
 * Note:
 *
 * If last_watered !== today
 *
 *
 * Convert json data type into json obj for easier
 * handling in front end, or use lodash?.
 *
 */
