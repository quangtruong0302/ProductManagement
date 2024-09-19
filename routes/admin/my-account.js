const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/my-account.controller.js");

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer();

const uploadImage = require("../../middlewares/admin/uploadImageToCloud.middleware.js");
cloudinary.config({
  cloud_name: "dqo9guoih",
  api_key: "885332919922856",
  api_secret: "CiqV-hp41tAtFdeAKSkDY7ujUmc",
});

router.get("/", controller.myAccount);
router.get("/edit", controller.edit);
router.patch(
  "/edit",
  upload.single("avatar"),
  uploadImage,
  controller.editPatch
);

module.exports = router;
