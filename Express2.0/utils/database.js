const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "node_course",
  "root",
  `${process.env.dbPass}`,
  { dialect: "mysql", host: "localhost" }
);

module.exports = sequelize;