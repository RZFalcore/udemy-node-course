const Cart = require("./cart");
const database = require("../utils/database");

// database
//   .execute("SELECT * FROM products")
//   .then((data) => console.log(data[0]))
//   .catch((err) => console.log(err));

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    return database.execute(
      "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static getAll() {
    return database.execute("SELECT * FROM products");
  }

  static getById(id) {
    return database.execute("SELECT * FROM products WHERE products.id = ?", [
      id,
    ]);
  }

  static delete(id) {}
};
