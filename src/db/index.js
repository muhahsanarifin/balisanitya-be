const pool = require("../configs/pg");

module.exports = {
  query: (query) => pool.query(query),
};
