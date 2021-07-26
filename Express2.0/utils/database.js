const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "node_course",
  "root",
  `${process.env.dbPass}`,
  { dialect: "mysql", host: "localhost" }
);

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node_course",
//   password: process.env.dbPass,
// });

// module.exports = pool.promise();
