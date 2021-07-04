const express = require("express");
const router = express.Router();

const users = require("./add-user").users;

router.get("/users", (req, res, next) => {
  res.render("users", { users, docTitle: "Users" });
});

module.exports = router;
