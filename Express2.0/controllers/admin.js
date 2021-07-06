const Product = require("../models/product");

//PRODUCTS

exports.getProducts = (req, res, next) => {
  Product.getAll((products) => {
    res.render("admin/products", {
      products,
      docTitle: "Products",
      path: "/admin/products",
    });
  });
};

// ADD PRODUCTS
exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};
