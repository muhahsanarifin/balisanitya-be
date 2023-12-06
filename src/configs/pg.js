const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
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
