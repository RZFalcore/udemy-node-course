const express = require("express");

const addUserRoute = require("./routes/add-user");
const usersRoute = require("./routes/users");

const app = express();
// Template
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Routes
app.use(addUserRoute.router);
app.use(usersRoute);

app.listen(3000);
