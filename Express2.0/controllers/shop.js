const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getShop = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", { products, docTitle: "Shop", path: "/" });
    })
    .catch((e) => console.log(e));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findByPk(productId)
    .then((product) => {
      res.render("shop/product-details", {
        product,
        docTitle: "Details",
        path: "products",
      });
    })
    .catch((e) => console.log(e));
};

exports.getCart = (req, res, next) => {
  console.log(req.user.cart);
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
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
  Product.getById(id, (product) => {
    Cart.addProduct(id, product.price);
  });
  res.redirect("/cart");
};

exports.postDeleteCartItem = (req, res, next) => {
  const id = req.body.productId;
  Product.getById(id, (product) => {
    Cart.deleteProduct(id, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", { docTitle: "Orders", path: "/orders" });
};

exports.getCheckout = (req, res, next) => {
  console.log("Checkout");
  res.redirect("/");
};
