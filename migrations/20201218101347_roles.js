
exports.up = function(knex) {
  return knex.schema.createTable('roles', table => {
      table.increments('id').primary()
      table.string('title', 50).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('roles')
};
