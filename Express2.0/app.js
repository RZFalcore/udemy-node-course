const path = require("path");

const express = require("express");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoutes = require("./routes/error");

const User = require("./models/user");

require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("613a601839c01a050ba751ad")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((e) => console.log(e));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorRoutes);

mongoose
  .connect(
    "mongodb+srv://User:dbPassword@cluster0.p2zd6.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((res) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Admin",
          email: "adminMail@mail.com",
          cart: { items: [] },
        });
        user.save();
      }
    });
    console.log("Connected to db.");
    app.listen(process.env.port);
  })
  .catch((err) => console.log(err));
