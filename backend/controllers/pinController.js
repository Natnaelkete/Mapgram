const router = require("express").Router();
const Pin = require("../models/Pin");
const asyncHandler = require("../middlewares/asyncHandler");
// const { protect } = require("../middlewares/authMiddleware");

//@desc Create a pin
//@route POST api/pins
//@access Private
const createPin = asyncHandler(async (req, res) => {
  const { lat, long, ...rest } = req.body;
  const existPin = await Pin.findOne({ lat, long });

  if (existPin) {
    res.status(400);
    throw new Error("The location is already pinned");
  }

  const pin = new Pin({
    lat,
    long,
    user: req.user._id,
    ...rest,
  });

  try {
    const savedPin = await pin.save();
    const populatedPin = await Pin.findById(savedPin._id).populate(
      "user",
      "id username"
    );
    res.status(201).json(populatedPin);
  } catch (error) {
    res.status(400);
    throw new Error("Unable to create a pin");
  }
});

//@desc Get pins
//@route GET api/pins
//@access Public
const getPins = asyncHandler(async (req, res) => {
  try {
    const pins = await Pin.find().populate("user", "id username");
    res.status(200).json(pins);
  } catch (error) {
    res.status(500);
    throw new Error("Cannot retrieve pins");
  }
});

//@desc Update  pins
//@route PATCH api/pins
//@access Private
const updatePin = asyncHandler(async (req, res) => {
  const pin = await Pin.findById(req.body.id);
  if (pin) {
    (pin.title = req.body.title),
      (pin.desc = req.body.desc),
      (pin.rating = req.body.rating);

    const updatedPin = await pin.save();

    res.json(updatedPin);
  } else {
    res.status(400);
    throw new Error("Pin not found");
  }
});

//@desc delete pins
//@route delete api/pins
//@access Private
const deletePin = asyncHandler(async (req, res) => {
  const pins = await Pin.findById(req.body.id);
  if (pins) {
    const pin = await Pin.deleteOne({ _id: req.body.id });
    res.json({ message: "Pin removed" });
  } else {
    res.status(400);
    throw new Error("There is no pin with that id");
  }
});

module.exports = { createPin, getPins, deletePin, updatePin };
