const fs = require("fs");
const path = require("path");

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
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(pathToData, JSON.stringify(products), (err) =>
        console.log(err)
      );
    });
  }

  static getAll(cb) {
    getProductsFromFile(cb);
  }
};