const Product = require("../models/product");

//PRODUCTS
exports.getProducts = (req, res, next) => {
  Product.find()
    // .select("price title -_id")
    // .populate("userId")
    .then((products) => {
      res.render("admin/products", {
        products,
        docTitle: "Products",
        path: "/admin/products",
      });
    })
    .catch((e) => console.log(e));
};

// ADD PRODUCTS
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    docTitle: "Add product",
    path: "/admin/add-product",
    edit: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, price, description, imageUrl } = req.body;
  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then(() => {
      console.log("Product added.");
      res.redirect("/admin/products");
    })
    .catch((e) => console.log(e));
};

// EDIT PRODUCT
exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const editFlag = req.query.edit;
  if (!editFlag) {
    res.redirect("/");
  }
  Product.findById(productId)
    .then((product) => {
      if (!product) res.redirect("/");

      res.render("admin/edit-product", {
        docTitle: "Edit product",
        path: "/admin/edit-product",
        edit: editFlag,
        product,
      });
    })
    .catch((e) => console.log(e));
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  Product.findById(productId)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then(() => {
      console.log("Product updated!");
      res.redirect("/admin/products");
    })
    .catch((e) => console.log(e));
};

// DELETE PRODUCT
exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.findByIdAndDelete(productId)
    .then(() => {
      console.log("Product deleted.");
      res.redirect("/admin/products");
    })
    .catch((e) => console.log(e));
};
