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

  static deleteProduct(id, price) {
    fs.readFile(pathToCart, (err, data) => {
      if (err) console.log("No data!");
      const cart = JSON.parse(data);
      if (cart.products.length !== 0) {
        const updateCart = { ...cart };
        const product = updateCart.products.find((prod) => prod.id === id);

        updateCart.totalPrice = updateCart.totalPrice - price * product.qty;
        updateCart.products = updateCart.products.filter(
          (prod) => prod.id !== id
        );

        fs.writeFile(pathToCart, JSON.stringify(updateCart), (err) =>
          console.log(err)
        );
      } else {
        return;
      }
    });
  }

  static getCart(cb) {
    fs.readFile(pathToCart, (err, data) => {
      const cart = JSON.parse(data);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
