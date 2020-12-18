
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('firstName', 100).notNullable()
      table.string('lastName', 100).notNullable()
      table.string('username', 100).notNullable().unique()
      table.string('email', 100).notNullable().unique()
      table.string('password', 255).notNullable()
      table.integer('role_id').unsigned()
      table.foreign('role_id').references('roles.id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
