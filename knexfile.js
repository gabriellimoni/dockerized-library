// used only for migrations
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'library-user',
      password: 'password',
      database: 'library-db',
    }
  },
  debug: true,
  pool: { min: 2, max: 5 },
}
