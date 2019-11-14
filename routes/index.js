const express = require("express");
const router = express.Router();
const authController = require("./controllers/authController");
const paintingController = require("./controllers/paintingController");

require("dotenv").config();

router.get("/", (req, res) => {
  res.send({ message: "hello" });
});

router.post("/signIn", authController.signIn, authController.createToken);

router.get("/user/:id", authController.verifyToken, authController.getUserInfo);

router.post(
  "/painting",
  authController.verifyToken,
  paintingController.savePainting
);

router.get(
  "/paintings/:id",
  authController.verifyToken,
  paintingController.getPainting
);

router.get("/paintings", authController.verifyToken, paintingController.getAll);

module.exports = router;
