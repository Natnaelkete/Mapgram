const router = require("express").Router();
const Pin = require("../models/Pin");
const asyncHandler = require("../middlewares/asyncHandler");
const UserPin = require("../models/UserPin");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { storage } = require("../config/cloudinary");
// const { protect } = require("../middlewares/authMiddleware");

const upload = multer({ storage });
//@desc Create a pin
//@route POST api/pins
//@access Private
const createPin = asyncHandler(async (req, res) => {
  const { title, desc, rating, lat, long } = req.body;
  const imageUrls = req.files.map((file) => file.path);

  try {
    const userPin = await UserPin.findOne({ user: req.user._id });
    const newPin = {
      title,
      desc,
      rating,
      lat,
      long,
      images: imageUrls,
    };

    if (userPin) {
      userPin.pins.push(newPin);
      await userPin.save();
    } else {
      const newUserPin = new UserPin({
        user: req.user._id,
        user: req.user.username,
        pins: [newPin],
      });
      await newUserPin.save();
    }

    res.status(201).send({
      userPin,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Request failed");
  }
});

//@desc Get only user pins
//@route GET api/pins/mine
//@access Protected
const getPins = asyncHandler(async (req, res) => {
  try {
    const pins = await UserPin.findOne({ user: req.user._id });
    res.status(200).json(pins.pins);
  } catch (error) {
    res.status(500);
    throw new Error("Cannot retrieve pins");
  }
});

//@desc Get pins by id
//@route GET api/pins/:id
//@access Protected
const getPinsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the UserPin document for the authenticated user
  const userPin = await UserPin.findOne({ _id: id });

  if (!userPin) {
    res.status(404).json({ message: "Pin not found" });
    return;
  }
  res.status(200).json(userPin.pins);
});

//@desc Update  pins
//@route PATCH api/pins
//@access Private
const updatePin = asyncHandler(async (req, res) => {
  const pin = await UserPin.findOne({ user: req.user._id });
  if (pin) {
    const pinToUpdate = pin.pins.id(req.body.id);

    pinToUpdate.title = req.body.title || pinToUpdate.title;
    pinToUpdate.desc = req.body.desc || pinToUpdate.desc;
    pinToUpdate.rating = req.body.rating || pinToUpdate.rating;

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

//@desc get Users
//@route GET api/users/
//@access Public
const getUsersPin = asyncHandler(async (req, res) => {
  const nameQuery = req.query.name
    ? { username: { $regex: req.query.name, $options: "i" } }
    : {};

  const users = await UserPin.findOne(nameQuery);

  if (!users) {
    res.status(404);
    throw new Error("No user with this name");
  } else {
    res.status(200).json(users);
  }
});

//@desc Delete pin images
//@route GET api/pins/image
//@access Private
const deleteImage = asyncHandler(async (req, res) => {
  const { pinId, imageUrl } = req.body;

  try {
    const userPin = await UserPin.findOne({ user: req.user._id });
    if (!userPin) {
      res.status(404);
      throw new Error("User pin not found");
    }

    const pin = userPin.pins.id(pinId);
    if (!pin) {
      res.status(404);
      throw new Error("Pin not found");
    }

    // Extract imageId from imageURL
    const imageId = `uploads/${imageUrl.split("/").pop().split(".")[0]}`;

    const cloudinaryImageInfo = await cloudinary.api.resource(imageId);

    if (!cloudinaryImageInfo) {
      res.status(404);
      throw new Error("Image is not found");
    }

    const result = await cloudinary.uploader.destroy(imageId);

    if (result.result !== "ok") {
      throw new Error("Failed to delete image");
    }

    pin.images = pin.images.filter((image) => !image.includes(imageId));

    await userPin.save();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = {
  createPin,
  upload,
  getPins,
  getPinsById,
  deletePin,
  updatePin,
  getUsersPin,
  deleteImage,
};
