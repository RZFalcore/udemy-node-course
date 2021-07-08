const Product = require("../models/product");

exports.getShop = (req, res, next) => {
  Product.getAll((products) => {
    res.render("shop/index", { products, docTitle: "Shop", path: "/" });
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

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.getById(productId, (product) => {
    res.render("shop/product-details", {
      product,
      docTitle: "Details",
      path: "products",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", { docTitle: "Cart", path: "/cart" });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { docTitle: "Orders", path: "/orders" });
};

exports.getCheckout = (req, res, next) => {
  console.log("Checkout");
  res.redirect("/");
};
