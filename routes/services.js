const multer = require("multer");
var express = require("express");
var router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const serviceController = require("../controller/services");

router.post("/", serviceController.postService);

router.get("/", serviceController.getAllServices);

router.post("/get", serviceController.getAService);

router.delete("/", serviceController.delete);

router.post("/update", serviceController.update);

router.post(
  "/update-profile",
  upload.single("file"),
  serviceController.updateProfileImage
);

module.exports = router;
