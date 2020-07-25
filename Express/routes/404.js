const path = require("path");
const express = require("express");

const rootDir = require("../utils/rootPath");

const routes = express.Router();

routes.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "pageNotFound.html"));
});

module.exports = routes;
