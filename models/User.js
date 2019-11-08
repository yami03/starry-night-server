const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  sns_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  picture_url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
