const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();
// PRODUCTS
router.get("/products", adminController.getProducts);

// ADD PRODUCT
router.get("/add-product", adminController.getAddProduct);
router.post("/add-product", adminController.postAddProduct);

// EDIT PRODUCT
router.get("/edit-product/:productId", adminController.getEditProduct);
router.post("/edit-product/", adminController.postEditProduct);

// DELETE PRODUCT
router.post("/delete-product/", adminController.postDeleteProduct);

module.exports= router;
