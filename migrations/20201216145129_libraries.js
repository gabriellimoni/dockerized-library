
exports.up = function(knex) {
  return knex.schema.createTable('libraries', table => {
      table.increments('id').primary()
      table.string('name', 100).unique().notNullable()
      table.string('city', 100)
      table.string('state', 2)
      table.string('street', 100)
      table.integer('number').unsigned()
      table.float('latitude', null)
      table.float('longitude', null)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('libraries')
};
