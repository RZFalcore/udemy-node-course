const { getDB } = require("../utils/database");
const mongodb = require("mongodb");
class User {
  constructor(userName, email) {
    this.userName = userName;
    this.email = email;
    this._id = mongodb.ObjectId();
  }

  save() {
    const database = getDB();
    const exists = database.collection("users").findOne({ email: this.email });

    if (exists) {
      return console.log("User already exists.");
    } else {
      return database
        .collection("users")
        .insertOne(this)
        .then(() => {
          console.log("User added");
        })
        .catch((e) => console.log(e));
    }
  }

  static findById(id) {
    const database = getDB();
    return database
      .collection("users")
      .findOne({ _id: mongodb.ObjectId(id) })
      .then((user) => {
        console.log("User found.");
        return user;
      })
      .catch((e) => console.log(e));
  }
}

module.exports = User;
