const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
  title: String,
  desc: String,
  rating: Number,
  lat: Number,
  long: Number,
  images: [String],
});

const userPinSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  username: { type: String, required: true },
  pins: [PinSchema],
});

const UserPin = mongoose.model("UserPin", userPinSchema);

module.exports = UserPin;
