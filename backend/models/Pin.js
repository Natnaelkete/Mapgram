const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    username: { type: String, required: true },
    title: { type: String, required: true, min: 3 },
    desc: { type: String, required: true, min: 3 },
    rating: { type: Number, required: true, max: 5, min: 0 },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
