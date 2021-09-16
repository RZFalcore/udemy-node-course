const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

//SHOP
router.get("/", shopController.getShop);

//PRODUCTS
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);

//CART
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);
router.post("/cart-delete-item", shopController.postDeleteCartItem);

//ORDERS
router.get("/orders", shopController.getOrders);
router.post("/create-order", shopController.postOrder);

module.exports = router;
