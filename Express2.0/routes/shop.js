const path = require("path");

const express = require("express");

const rootDir = require('../utils/path');

const router = express.Router();

const adminData = require("../routes/admin");

router.get("/", (req, res, next) => {
  res.render("shop");

  // OLD
  // res.sendFile(path.join(rootDir ,"views", "shop.html"));
});

module.exports = router;
