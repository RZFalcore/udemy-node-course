const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/product", (req, res, next) => {
    console.log(req.body)
    res.redirect("/")
})

app.use("/add-product",(req, res, next) => {
    // console.log("Add product page.");
    res.send("<form action='product' method='POST'><input type='text' name='title'/><button type='submit'>Add product</button></form>")
});

app.use("/",(req, res, next) => {
//   console.log("Home page.");
  res.send("<h1>Home</h1>");
});

app.listen(3000);
