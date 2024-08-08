const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/auth.controller.js");
const valitate = require("../../validates/auth.validation.js");
router.get("/login", controller.login);
router.post("/login", valitate.login, controller.loginPost);
router.get("/logout", controller.logout);

module.exports = router;
