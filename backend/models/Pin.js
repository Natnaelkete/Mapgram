const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
  title: String,
  desc: String,
  rating: Number,
  lat: Number,
  long: Number,
});

module.exports = mongoose.model("Pin", PinSchema);
