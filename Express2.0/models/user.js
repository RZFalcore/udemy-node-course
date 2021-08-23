const { getDB } = require("../utils/database");
const mongodb = require("mongodb");
class User {
  constructor(userName, email, cart, id) {
    this.userName = userName;
    this.email = email;
    this.cart = cart ? cart : {}; //{items: [] }
    this._id = id;
    this.cart.items = cart ? cart.items : [];
  }

  save() {
    const database = getDB();
    return database.collection("users").insert(this);

    // const database = getDB();
    // const exists = database.collection("users").findOne({ email: this.email });
    // if (exists) {
    //   return console.log("User already exists.");
    // } else {
    //   return database
    //     .collection("users")
    //     .insertOne(this)
    //     .then(() => {
    //       console.log("User added");
    //     })
    //     .catch((e) => console.log(e));
    // }
  }

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(
    //   (cartProduct) => cartProduct._id === product._id
    // );
    const updatedCart = {
      items: [{ productId: new mongodb.ObjectId(product._id), quantity: 1 }],
    };
    const database = getDB();
    return database
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
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
