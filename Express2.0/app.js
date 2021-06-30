const path = require("path");

const express = require("express");

const admin = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorRouter = require("./routes/error");

const app = express();

// PUG -----------------------
app.set("view engine", "pug");
app.set("views", "views");
//----------------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,  "public")));

app.use("/admin", admin.router);
app.use(shopRouter);
app.use(errorRouter);

app.listen(3000);
