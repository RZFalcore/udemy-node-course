const Product = require("../models/product");

exports.getShop = (req, res, next) => {
  Product.getAll((products) => {
    res.render("shop/products-list", { products, docTitle: "Shop", path: "/" });
  });
};

exports.getProducts = (req, res, next) => {
  Product.getAll((products) => {
    res.render("shop/products-list", {
      products,
      docTitle: "Products",
      path: "/products-list",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", { docTitle: "Cart", path: "/cart" });
};