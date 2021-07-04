const express = require("express");

const pageNotFoundController = require("../controllers/errors");

const router = express.Router();

router.use(pageNotFoundController);

module.exports = router;
