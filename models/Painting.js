const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paintingSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  paths: [
    {
      key: Number,
      d: String,
      stroke: String,
      strokeWidth: Number,
      fill: String
    }
  ],
  location: {
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    }
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  ],
  png: String
});

module.exports = mongoose.model("Painting", paintingSchema);
