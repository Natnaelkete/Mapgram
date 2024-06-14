const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
    rating: {
      type: Number,
      require: [true, "rating is must"],
      minlength: [0, "0 is the minimum"],
      maxlength: [5, "5 is maximum"],
    },
    lat: Number,
    long: Number,
    images: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const userPinSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  username: { type: String, required: true },
  pins: [PinSchema],
  followed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const UserPin = mongoose.model("UserPin", userPinSchema);

module.exports = UserPin;
