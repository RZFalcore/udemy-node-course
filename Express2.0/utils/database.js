const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node_course",
  password: process.env.dbPass,
});

module.exports = pool.promise();
