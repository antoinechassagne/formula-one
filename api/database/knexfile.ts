// @ts-nocheck
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    },
    pool: {
      min: 1,
      max: 10,
      propagateCreateError: false
    },
    migrations: {
      tableName: "migrations"
    }
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    },
    pool: {
      min: 1,
      max: 10,
      propagateCreateError: false
    },
    migrations: {
      tableName: "migrations"
    }
  }
};
