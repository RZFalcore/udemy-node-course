// require("dotenv").config();
// `${process.env.dbPass}`,
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://User:dbPassword@cluster0.p2zd6.mongodb.net/udemyShop?retryWrites=true&w=majority"
  )
    .then((res) => {
      console.log("Connected to db.");
      cb(res);
    })
    .catch((e) => console.log(e));
};

module.exports = mongoConnect;
