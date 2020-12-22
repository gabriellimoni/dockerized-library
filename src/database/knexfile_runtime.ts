const socketPath = process.env.DB_SOCKET_PATH || '/cloudsql'
export default {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      socketPath: `${socketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`
    }
  },
  debug: true,
  pool: { min: 2, max: 5 },
}