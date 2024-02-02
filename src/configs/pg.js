const { Pool } = require("pg");

const connectionString = `postgres://postgres.qjheiewxydzpozhuxpvp:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASENAME}`;

const pool = new Pool({
  connectionString,
});

pool
  .connect()
  .then(() => {
    console.log("Database is connected.");
  })
  .catch((error) => {
    console.log("Error connecting to PostgreSQL:", error);
  });

module.exports = pool;
