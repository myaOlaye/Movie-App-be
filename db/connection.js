const { Pool } = require("pg");
// when we run jest, NODE_ENV is automatically set with test
const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
}

const db = new Pool();

module.exports = db;
