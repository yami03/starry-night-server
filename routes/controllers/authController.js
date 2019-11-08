const jwt = require("jsonwebtoken");
const User = require("../../models/User");

require("dotenv").config();

exports.signIn = async (req, res, next) => {
  try {
    const { id, name, picture } = req.body;
    let user = await User.findOne({ sns_id: id });

    if (!user) {
      user = await new User({
        sns_id: id,
        picture_url: picture,
        name
      }).save();
    }

    req.body._id = user._id;

    next();
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

exports.createToken = (req, res) => {
  try {
    req.session._id = req.body._id;

    res.send({
      _id: req.body._id,
      token: jwt.sign(req.body._id.toJSON(), process.env.TOKEN_SECRET_KEY)
    });
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (decoded) return next();

    throw "error";
  } catch (e) {
    return res.status(401).send({ error: "unauthorized" });
  }
};
