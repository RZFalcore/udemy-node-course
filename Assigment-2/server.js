const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("First middleware.");
//   next();
// });

// app.use((rq, rs, next) => {
//   console.log("Second middleware.");
//   next();
// });

app.use("/users", (req, res) => {
  res.send("<h1>Users page</h1>");
});

app.use("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

app.listen(4000);
