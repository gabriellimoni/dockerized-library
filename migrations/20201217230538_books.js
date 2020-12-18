
exports.up = function(knex) {
  return knex.schema.createTable('books', table => {
      table.increments('id').primary()
      table.string('name', 100).notNullable()
      table.string('edition', 100).notNullable()
      table.integer('year', 4).notNullable()
      table.integer('library_id').unsigned()
      table.foreign('library_id').references('libraries.id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('books')
};
