const { json } = require("body-parser");
const fs = require("fs");
const path = require("path");

const pathToCart = path.join(require.main.filename, "..", "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    let cart = { products: [], totalPrice: 0 };
    fs.readFile(pathToCart, (err, data) => {
      //If cart existed
      if (!err) {
        cart = JSON.parse(data);
      }
      const existedProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existedProduct = cart.products[existedProductIndex];

      let updatedProduct;
      if (existedProduct) {
        updatedProduct = { ...existedProduct, qty: (existedProduct.qty += 1) };
        cart.products = [...cart.products];
        cart.products[existedProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(pathToCart, JSON.stringify(cart), (err) => console.log(err));
    });
  }
};
