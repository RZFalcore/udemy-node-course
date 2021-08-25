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
    const cartProductIndex = this.cart.items.findIndex((cartProduct) =>
      cartProduct.productId.equals(product._id)
    );

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    const database = getDB();
    return database
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart = () => {
    const database = getDB();
    const productsIds = this.cart.items.map((item) => item.productId);
    return database
      .collection("products")
      .find({ _id: { $in: productsIds } })
      .toArray()
      .then((products) =>
        products.map((product) => {
          return {
            ...product,
            quantity: this.cart.items.find(
              (item) => item.productId.toString() === product._id.toString()
            ).quantity,
          };
        })
      );
  };

  deleteCartItem = (id) => {
    const updatedCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== id.toString()
    );
    const updatedCart = { items: updatedCartItems };

    const database = getDB();
    return database
      .collection("users")
      .updateOne(
        { _id: mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  };

  addOrder = () => {
    const database = getDB();
   return this.getCart()
     .then((products) => {
       const order = {
         items: products,
         user: {
           _id: mongodb.ObjectId(this._id),
           name: this.name,
         },
       };
       return database.collection("orders").insertOne(order);
     })
     .then(() => {
       this.cart = [];
       return database
         .collection("users")
         .updateOne(
           { _id: mongodb.ObjectId(this._id) },
           { $set: { cart: { items: [] } } }
         );
     });
  };

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
