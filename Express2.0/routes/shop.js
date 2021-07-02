// const path = require("path");
// const rootDir = require('../utils/path');

const express = require("express");

const adminData = require("../routes/admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", { products: products, docTitle: "Shop" });
});

module.exports = router;
