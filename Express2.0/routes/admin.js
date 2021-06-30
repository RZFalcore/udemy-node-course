const path = require("path");

const express = require("express");

const rootDir = require('../utils/path');

const router = express.Router();

const products = [];

router.post("/add-product", (req, res, next) => {
  products.push({ ...req.body });
  res.redirect("/");
});

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

exports.router = router;
exports.products = products;
