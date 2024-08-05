const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/categories.controller.js");
const validate = require("../../validates/products.validate.js");

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer();

const uploadImage = require("../../middlewares/uploadImageToCloud.middleware.js");
cloudinary.config({
  cloud_name: "dqo9guoih",
  api_key: "885332919922856",
  api_secret: "CiqV-hp41tAtFdeAKSkDY7ujUmc",
});

router.get("/", controller.categories);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  uploadImage,
  controller.createPost
);
router.get("/edit/:id", controller.edit);

router.delete("/delete/:id", controller.delete);
module.exports = router;
