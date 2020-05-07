/* migrations/[...]_change_user_zip_type.js */

exports.up = function(knex) {
  return knex.schema.alterTable('users', function(table) {
    table.string('zipcode', 5).alter();
  });
};

exports.down = function(knex) {
    return knex.schema.alterTable('users', function(table) {
    table.integer('zipcode').alter();
     });
};