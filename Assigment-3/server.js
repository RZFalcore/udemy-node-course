const express = require("express");

const mainRoute = require("./routes/main");
const usersRoute = require("./routes/users");

const app = express();

app.use(express.static("public"));

app.use(mainRoute);
app.use(usersRoute);

app.listen(4000);
