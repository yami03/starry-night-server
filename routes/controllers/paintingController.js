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
  const coords = [req.params.longitude, req.params.latitude];
  console.log(coords);

  try {
    // let paintings = await Painting.find({
    //   location: {
    //     $near: {
    //       $geometry: {
    //         type: "Point",
    //         coordinates: coords
    //       },
    //       $minDistance: 0,
    //       $maxDistance: 10000
    //     }
    //   }
    // });
    const paintings = await Painting.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: coords
          },
          $minDistance: 0,
          $maxDistance: 10000
        }
      }
    });

    res.send({ paintings });
  } catch (err) {
    console.log(err.message);
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
