import knex from "knex";

export default knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 3000,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  },
  pool: {
    min: 1,
    max: 10,
    propagateCreateError: false
  }
});
