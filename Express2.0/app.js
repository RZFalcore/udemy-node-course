const express = require("express");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorRouter = require("./routes/error");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(adminRouter);
app.use(shopRouter);
app.use(errorRouter);

app.listen(3000);
