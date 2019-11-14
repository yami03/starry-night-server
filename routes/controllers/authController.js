const jwt = require("jsonwebtoken");
const User = require("../../models/User");

require("dotenv").config();

exports.signIn = async (req, res, next) => {
  try {
    const sess = req.session;
    const { id, name, picture } = req.body;
    let user = await User.findOne({ sns_id: id });

    if (!user) {
      user = await new User({
        sns_id: id,
        picture_url: picture.data.url,
        name
      }).save();
    }

    sess.userId = user._doc._id.toJSON();

    next();
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send({
      id: req.params.id,
      name: user.name,
      profile_picture_url: user.picture_url
    });
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};

exports.createToken = (req, res) => {
  try {
    res.send({
      _id: req.session.userId,
      token: jwt.sign(req.session.userId, process.env.TOKEN_SECRET_KEY)
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

    req.body.id = decoded;

    if (decoded) return next();

    throw "error";
  } catch (e) {
    return res.status(401).send({ error: "unauthorized" });
  }
};
