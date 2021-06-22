const path = require("path");

const express = require("express");

const rootDir = require('../utils/path');

const router = express.Router();

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

module.exports = router;
