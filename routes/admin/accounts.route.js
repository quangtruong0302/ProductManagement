const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/accounts.controller");
const validate = require("../../validates/accounts.validate.js");

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer();

const uploadImage = require("../../middlewares/uploadImageToCloud.middleware.js");
cloudinary.config({
  cloud_name: "dqo9guoih",
  api_key: "885332919922856",
  api_secret: "CiqV-hp41tAtFdeAKSkDY7ujUmc",
});

router.get("/", controller.accounts);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("avatar"),
  uploadImage,
  validate.createPost,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadImage,
  controller.editPatch
);

module.exports = router;
