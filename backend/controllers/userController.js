const asyncHandler = require("../middlewares/asyncHandler");
const generateToken = require("../utils/generateToken");
const User = require("../models/User");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { storageForProfile } = require("../config/cloudinary");

const upload = multer({ storage: storageForProfile });

//@desc Register a new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const imageUrl = req.file ? req.file.path : null;

  const user = await User.create({
    username: username,
    email: email,
    password: password,
    image: imageUrl,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc update user
//@route POST /api/users
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const updatedImage = req.file ? req.file.path : null;

  // Delete the old image from Cloudinary if a new image is uploaded
  if (user.image && updatedImage) {
    const oldImageId = `profile/${user.image.split("/").pop().split(".")[0]}`;
    await cloudinary.uploader.destroy(oldImageId);
  }

  // Update user fields
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.image = updatedImage || user.image;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    email: updatedUser.email,
    username: updatedUser.username,
    image: updatedUser.image,
  });
});

//@desc Logout users
//@route POST api/users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = { registerUser, authUser, logoutUser, upload, updateUser };
