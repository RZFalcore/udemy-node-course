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
  res.render("admin/edit-product", {
    docTitle: "Add product",
    path: "/admin/add-product",
    edit: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const id = null;
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(id, title, imageUrl, price, description);
  product
    .save()
    .then(() => {
      res.redirect("/");
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
  Product.getById(productId, (product) => {
    if (!product) res.redirect("/");
    res.render("admin/edit-product", {
      docTitle: "Edit product",
      path: "/admin/edit-product",
      edit: editFlag,
      product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    price,
    description
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.delete(productId);
  res.redirect("/admin/products");
};