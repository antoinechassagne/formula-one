require("dotenv").config({ path: "../.env" });

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: true
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: "migrations"
    }
  },
  production: {
    client: "mysql",
    connection: {
      host: process.env.DATABASE_HOST,
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
