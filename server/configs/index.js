
module.exports = {
  development: {
    server: {
      port: 5000
    },
    database: {
      client: 'pg',
      connection: {
        host: 'localhost',
        port: 5432,
        user: 'alex',
        password: 'password',
        database: 'todo'
      },
      migrations: {
        tableName: 'migrations',
        directory: './migrations'
      },
      seeds: {
        directory: './seeds'
      }
    }
  }
};
