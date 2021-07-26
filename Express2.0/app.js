const path = require("path");

const express = require("express");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoutes = require("./routes/error");

const sequelize = require("./utils/database");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

sequelize
  .sync()
  .then(() => app.listen(3000))
  .catch((e) => console.log(e));
