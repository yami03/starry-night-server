const Painting = require("../../models/Painting");

exports.savePainting = async (req, res) => {
  try {
    await new Painting({
      user: req.body.id,
      paths: req.body.paths,
      location: req.body.location,
      png: req.body.png
    }).save();

    res.send({ result: "ok" });
  } catch {
    res.status(400).send({ result: "error" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const paintings = await Painting.find();

    res.send({ paintings });
  } catch {
    res.status(400).send({ result: "error" });
  }
};

exports.getPainting = async (req, res) => {
  try {
    const paintings = await Painting.find({ user: req.params.id });

    res.send({ paintings });
  } catch {
    res.status(400).send({ result: "error" });
  }
};
