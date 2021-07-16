const fs = require("fs");
const path = require("path");

const Cart = require("./cart");

const pathToData = path.join(
  require.main.filename,
  "..",
  "data",
  "productData.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(pathToData, (err, data) => {
    if (err) {
      console.log(err);
      return cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existedProductIndex = products.findIndex((p) => p.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existedProductIndex] = this;

        fs.writeFile(pathToData, JSON.stringify(updatedProducts), (err) =>
          console.log(err)
        );
      } else {
        this.id = Math.floor(Math.random() * 10000);
        products.push(this);

        fs.writeFile(pathToData, JSON.stringify(products), (err) =>
          console.log(err)
        );
      }
    });
  }

  static getAll(cb) {
    getProductsFromFile(cb);
  }

  static getById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === +id);
      cb(product);
    });
  }

  static delete(id) {
    getProductsFromFile((products) => {
      const intId = parseInt(id);
      const product = products.filter((prod) => prod.id === intId);
      const updatedProducts = products.filter(
        (product) => product.id !== intId
      );

      fs.writeFile(pathToData, JSON.stringify(updatedProducts), (err) => {
        console.log(err);
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
};
