const path = require("path");

const express = require("express");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoutes = require("./routes/error");

// const { mongoConnect } = require("./utils/database");
// const User = require("./models/user");

require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("611b9bf415038dbe8b23d94d")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((e) => console.log(e));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

mongoose
  .connect(
    "mongodb+srv://User:dbPassword@cluster0.p2zd6.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((res) => {
    console.log("Connected to db.");
    app.listen(process.env.port);
  })
  .catch((err) => console.log(err));
