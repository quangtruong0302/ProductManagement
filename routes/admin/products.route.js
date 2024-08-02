const express = require("express");
const router = express.Router();
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

const controller = require("../../controllers/admin/products.controller.js");
router.get("/", controller.products);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost,
  uploadImage,
  controller.createPost
);

router.patch("/change-status/:status/:id", controller.changeStatus);
router.delete("/delete/:id", controller.delete);
router.get("/trash", controller.trash);
router.patch("/restore/:id", controller.restore);
router.delete("/formPermanentDelete/:id", controller.formPermanentDelete);

module.exports = router;
