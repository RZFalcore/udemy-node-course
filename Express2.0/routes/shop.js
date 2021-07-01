const path = require("path");

const express = require("express");

const rootDir = require('../utils/path');
const adminData = require("../routes/admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", { products, docTitle: "Shop" });

  // OLD
  // res.sendFile(path.join(rootDir ,"views", "shop.html"));
});

module.exports = router;
