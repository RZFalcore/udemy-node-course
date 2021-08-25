const Product = require("../models/product");

// INDEX PAGE

exports.getShop = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", { products, docTitle: "Shop", path: "/" });
    })
    .catch((e) => console.log(e));
};

// PRODUCTS

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/products-list", {
        products,
        docTitle: "Products",
        path: "/products-list",
      });
    })
    .catch((e) => console.log(e));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.fetchProduct(productId)
    .then((product) => {
      res.render("shop/product-details", {
        product,
        docTitle: "Details",
        path: "products",
      });
    })
    .catch((e) => console.log(e));
};

// CART

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) =>
      res.render("shop/cart", {
        docTitle: "Cart",
        path: "/cart",
        products,
      })
    )
    .catch((e) => console.log(e));
};

exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.fetchProduct(id)
    .then((product) => req.user.addToCart(product))
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
};

exports.postDeleteCartItem = (req, res, next) => {
  const id = req.body.productId;

  req.user.deleteCartItem(id).then(() => {
    console.log(`Product ID:${id} deleted.`);
    res.redirect("/cart");
  });
};

// ORDERS

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        docTitle: "Orders",
        path: "/orders",
        orders,
      });
    })
    .catch((e) => console.log(e));
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then(() => res.redirect("/orders"))
    .catch((e) => console.log(e));
};
