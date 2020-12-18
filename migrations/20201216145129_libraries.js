
exports.up = function(knex) {
  return knex.schema.createTable('libraries', table => {
      table.increments('id').primary()
      table.string('name', 100).unique().notNullable()
      table.string('city', 100)
      table.string('state', 2)
      table.string('street', 100)
      table.integer('number').unsigned()
      table.decimal('latitude', 15, 13)
      table.decimal('longitude', 15, 13)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('libraries')
};
