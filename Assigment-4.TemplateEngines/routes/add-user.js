const express = require("express");
const router = express.Router();

const users = [];

router.post("/add-user", (req, res, next) => {
  users.push({ ...req.body });
  console.log(users);
  res.redirect("/add-user");
});

router.get("/add-user", (req, res, next) => {
  res.render("add-user", { docTitle: "Add user" });
});

exports.router = router;
exports.users = users;
