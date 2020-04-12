exports.up = function(knex) {
  return knex.schema.createTable('gardens', (table) => {
    table.string('garden_name').notNullable().primary(); /* PK */
    table.string('users_email', 50).references('email').inTable('users'); /* FK */
    table.integer('plants_plant_id').unsigned().references('plant_id').inTable('plants'); /* FK */
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('gardens');
};
