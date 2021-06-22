const express = require("express");

const router = express.Router();

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

router.get("/add-product", (req, res, next) => {
  res.send(
    `
    <h1>Add product</h1>
    <form action='/admin/add-product' method='POST'>
      <input type='text' name='title'/>
      <button type='submit'>Add product</button>
    </form>`
  );
});

module.exports = router;
