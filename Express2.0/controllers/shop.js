const Product = require("../models/product");
// const Cart = require("../models/cart");
// const Order = require("../models/order");

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

// // CART

// exports.getCart = (req, res, next) => {
//   console.log(req.user);
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts();
//     })
//     .then((products) =>
//       res.render("shop/cart", {
//         docTitle: "Cart",
//         path: "/cart",
//         products,
//       })
//     )
//     .catch((e) => console.log(e));
// };

exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.fetchProduct(id).then(product => {
    return req.user.addToCart(product);
  }).then(result => console.log(result));
}


  // console.log("ID: ", id);
  // let fetchedCart;

//   req.user
//     .getCart()
//     .then((cart) => cart.getProducts({ where: { id } }))
//     .then((products) => {
//       let product;
//       let quantity = 1;

//       if (products.length > 0) product = product[0];

//       if (product) {
//         const oldQuatity = product.cartItem.quantity;
//         quantity += oldQuatity;
//         return fetchedCart.addProduct(product, { through: { quantity } });
//       }

//       return Product.findByPk(id).then((prod) =>
//         fetchedCart.addProduct(prod, { through: quantity })
//       );
//     })
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((e) => console.log);
// };



// exports.postDeleteCartItem = (req, res, next) => {
//   const id = req.body.productId;

//   req.user
//     .getCart()
//     .then((cart) => cart.getProducts({ where: id }))
//     .then((products) => {
//       const product = products[0];
//       return product.cartItem.destroy();
//     })
//     .then(() => res.redirect("/cart"))
//     .catch((e) => console.log(e));

//   Product.getById(id, (product) => {
//     Cart.deleteProduct(id, product.price);
//     res.redirect("/cart");
//   });
// };

// // ORDERS

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({ include: ["products"] })
//     .then((orders) => {
//       res.render("shop/orders", {
//         docTitle: "Orders",
//         path: "/orders",
//         orders,
//       });
//     })
//     .catch((e) => console.log(e));
// };

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) =>
//       req.user
//         .createOrder()
//         .then((order) =>
//           order.addProducts(
//             products.map((product) => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           )
//         )
//         .catch((e) => console.log(e))
//     )
//     .then(() => fetchedCart.setProducts(null))
//     .then(() => res.redirect("/orders"))
//     .catch((e) => console.log(e));
// };
