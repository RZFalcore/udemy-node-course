const path = require("path");

const express = require("express");

const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");
const errorRoutes = require("./routes/error");

const mongoConnect = require("./utils/database");

require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((e) => console.log(e));
});

app.use("/admin", adminRoutes);
// app.use(shopRoutes);
app.use(errorRoutes);

mongoConnect(() => {
  app.listen(process.env.port);
});
