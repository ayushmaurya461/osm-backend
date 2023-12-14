var express = require("express");
var router = express.Router();
const checkAuth = require("../middleware/check-auth");

const userController = require("../controller/user");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post("/get", checkAuth, userController.getAUser);

router.post(
  "/update-profile",
  upload.single("file"),
  userController.updateProfileImage
);

router.patch("/change-user-type", userController.changeUserType);

router.post("/update-service", userController.updateService);

router.post("/update", userController.update);

router.post("/validate", checkAuth, userController.validateUser);

router.delete("/", userController.delete);

module.exports = router;
