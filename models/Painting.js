const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paintingSchema = new Schema(
  {
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
      type: {
        type: String,
        default: "Point"
      },
      coordinates: [Number]
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      }
    ],
    png: String
  },
  {
    timestamps: { createdAt: "created_at" }
  }
);

paintingSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Painting", paintingSchema);
