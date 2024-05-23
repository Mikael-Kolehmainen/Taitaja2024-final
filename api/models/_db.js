const knex = require("knex");
const knexConfig = require("../knexfile");

/*
  This is _db.js, this file creates the Knex Db connector using the configurations
  in knexfile.js. This file is used by the models to communicate with the database.
*/

module.exports = knex(knexConfig);
