require("dotenv").config();

/*
  This is the configuration file for Knex. Knex is a query builder and an ORM.
  Here Knex has been configured to work with a mysql database.
*/

module.exports = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
