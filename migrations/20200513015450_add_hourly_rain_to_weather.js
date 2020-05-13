exports.up = function (knex) {
        return knex.schema.table('weather', function (table) {
            table.decimal('hourly_rain', 5, 2);
        })
};

exports.down = function (knex) {
        return knex.schema.table('weather', function (table){
            table.dropColumn('hourly_rain');
        })
};