const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Product", productSchema);



// const mongodb = require("mongodb");
// const { getDB } = require("../utils/database");

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const database = getDB();
//     let dbOperation;
//     if (this._id) {
//       //Update product
//       dbOperation = database
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       // Creates or connects to products COLLECTION
//       dbOperation = database.collection("products").insertOne(this);
//     }
//     return dbOperation
//       .then((result) => console.log(result))
//       .catch((e) => console.log(e));
//   }

//   static fetchAll() {
//     const database = getDB();

//     return database
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((e) => console.log(e));
//   }

//   static fetchProduct(id) {
//     const database = getDB();

//     return database
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(id) })
//       .next()
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch((e) => console.log(e));
//   }

//   static delete(id) {
//     const database = getDB();
//     return database
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(id) })
//       .then(() => {
//         console.log("Product deleted.");
//       })
//       .catch((e) => console.log(e));
//   }
// }

// module.exports = Product;
