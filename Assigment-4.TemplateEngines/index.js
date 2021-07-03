const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const users = [];

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.render("add-user", { docTitle: "Add user" });
});

app.get("/users", (req, res, next) => {
  res.render("users", { docTitle: "Users" });
});

app.post("/add-user", (req, res, next) => {
  users.push({ ...req.body });
  console.log(users);
  res.redirect("/");
});

app.listen(3000);
