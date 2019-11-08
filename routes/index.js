const express = require("express");
const router = express.Router();
const Painting = require("../models/Painting");
const authController = require("./controllers/authController");

require("dotenv").config();

router.get("/", (req, res) => {
  res.send({ message: "hello" });
});

router.post("/signIn", authController.signIn, authController.createToken);

router.post("/painting", async (req, res) => {
  await new Painting({
    users: "TEST",
    path: req.body.donePaths
  }).save();

  res.send({ result: "ok" });
});

module.exports = router;
