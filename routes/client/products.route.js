const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/products.controller");

router.get("/products", controller.home);

module.exports = router;
