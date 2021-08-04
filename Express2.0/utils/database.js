const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://User:dbPassword@cluster0.p2zd6.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected to db.");
      db = client.db();
      cb();
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

const getDB = () => {
  if (db) {
    return db;
  } else {
    throw "No DB found.";
  }
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
