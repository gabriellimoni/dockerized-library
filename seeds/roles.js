
exports.seed = function(knex) {
  return knex('roles').del()
    .then(function () {
      return knex('roles').insert([
        {id: 1, title: 'admin'},
        {id: 2, title: 'free'},
        {id: 3, title: 'premium'},
      ])
    })
}
