const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/products.controller");

router.get("/", controller.home);
router.get("/:slug", controller.category);

module.exports = router;
