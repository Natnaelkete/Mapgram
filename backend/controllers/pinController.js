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
  console.log(req.user._id);

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
        username: req.user.username,
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
    res.status(200).json(pins);
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

  // Find the UserPin document for the authenticated users
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
  const { id } = req.body;

  const userPins = await UserPin.findOne({ user: req.user._id });

  if (!userPins) {
    res.status(404);
    throw new Error("User pins not found");
  }

  const pin = userPins.pins.id(id);
  if (!pin) {
    res.status(404);
    throw new Error("Pin not found");
  }

  userPins.pins.pull(id);

  await userPins.save();

  res.json({ message: "Pin removed successfully" });
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

//@desc Search Users
//@route GET api/users/search
//@access Public
const searchUsers = asyncHandler(async (req, res) => {
  const { username } = req.query;

  const users = await UserPin.find({
    username: new RegExp(username, "i"),
  }).populate("user", "image");

  if (!users.length) {
    res.status(404);
    throw new Error("No users with this name found");
  }

  res.status(200).json(users);
});

//@desc Follow / Unfollow User
//@route GET api/pins/follow
//@access Protected
const following = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const userPin = await UserPin.findOne({ user: req.user._id });
  const targetUserPin = await UserPin.findOne({ user: userId });

  if (!userPin || !targetUserPin) {
    res.status(404);
    throw new Error("User not found");
  }

  const isFollowing = userPin.followed.includes(targetUserPin.user);

  if (isFollowing) {
    userPin.followed.pull(targetUserPin.user);
    targetUserPin.followers.pull(userPin.user);
    await userPin.save();
    await targetUserPin.save();
    res.json({ message: "Unfollowed User" });
  } else {
    userPin.followed.push(targetUserPin.user);
    targetUserPin.followers.push(userPin.user);
    await userPin.save();
    await targetUserPin.save();
    res.json({ message: "Followed user" });
  }
});

//@desc get Followers users pin
//@route GET api/pins/followers-pins
//@access Protected
const followersUsersPin = asyncHandler(async (req, res) => {
  const userPin = await UserPin.findOne({ user: req.user._id }).populate(
    "followers"
  );

  if (!userPin) {
    res.status(404);
    throw new Error("User not found");
  }

  const followedUsersPins = await UserPin.find({
    user: { $in: userPin.followers },
  });

  res.json(
    followedUsersPins.flatMap((followedUserPin) => followedUserPin.pins)
  );
});

//@desc get Followed users pin
//@route GET api/pins/followed-pins
//@access Protected
const followedUsersPin = asyncHandler(async (req, res) => {
  try {
    const userPin = await UserPin.findOne({ user: req.user._id }).populate(
      "followed"
    );

    if (!userPin) {
      res.status(404);
      throw new Error("User not found");
    }

    const followedUsersPins = await UserPin.find({
      user: { $in: userPin.followed },
    }).populate("user", "image");

    res.json(followedUsersPins.flatMap((followedUserPin) => followedUserPin));
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc Like/unlike posted pins
// @route POST api/pins/likes
// @access Private
const LikePosts = asyncHandler(async (req, res) => {
  const { user: targetedUserId, id: pinId } = req.body;

  const userPin = await UserPin.findOne({ user: req.user._id });

  const targetedUser = await UserPin.findById(targetedUserId);

  if (!userPin || !targetedUser) {
    res.status(404);
    throw new Error("Unable to like");
  }

  const theRightPin = targetedUser.pins.id(pinId);

  if (!theRightPin) {
    res.status(404);
    throw new Error("Pin not found");
  }

  const alreadyExist = theRightPin.likes.some((like) =>
    like.equals(userPin.user)
  );

  if (alreadyExist) {
    theRightPin.likes.pull(userPin.user);
    userPin.liked.pull(theRightPin._id);
    await targetedUser.save();
    await userPin.save();
    res.json({ message: "Unliked" });
  } else {
    theRightPin.likes.push(userPin.user);
    userPin.liked.push(theRightPin._id);
    await targetedUser.save();
    await userPin.save();
    res.json({ message: "Liked" });
  }
});

// @desc getLiked pins
// @route Get api/pins/liked-pin
// @access Private
const getLikedPin = asyncHandler(async (req, res) => {
  const { id: pinId } = req.query;

  const userPin = await UserPin.findOne({ user: req.user._id });

  if (!userPin) {
    res.status(404);
    throw new Error("User not found");
  }

  const isLiked = userPin.liked.includes(pinId);
  if (!isLiked) {
    return res.json([]);
  }

  const likedUserPin = await UserPin.findOne({
    "pins._id": pinId,
  });

  if (!likedUserPin) {
    res.status(404);
    throw new Error("Pin not found");
  }

  const exactPin = likedUserPin.pins.id(pinId);

  res.json(exactPin._id);
});

// @desc getLikes pins
// @route Get api/pins/likes-pin
// @access Private
const getLikesPin = asyncHandler(async (req, res) => {
  const { user: targetedUserId, id: pinId } = req.query;

  const targetedUser = await UserPin.findById(targetedUserId);

  if (!targetedUser) {
    res.status(404);
    throw new Error("User not found");
  }

  const theRightPin = targetedUser.pins.id(pinId);

  if (!theRightPin) {
    res.status(404);
    throw new Error("Pin not found");
  }

  const likedUsers = theRightPin.likes;

  res.json(likedUsers);
});

// @desc Find a user by pin id
//@route GET api/pins/detail
//@access Private
const findUserByPinId = asyncHandler(async (req, res) => {
  const { user, id: pinId } = req.query;

  const targetedUser = await UserPin.findOne({ _id: user });

  if (!targetedUser) {
    res.status(404);
    throw new Error("User is not found");
  }

  exactPin = targetedUser.pins.id(pinId);
  res.status(200).json(exactPin);
});

module.exports = {
  createPin,
  upload,
  getPins,
  getPinsById,
  deletePin,
  updatePin,
  searchUsers,
  following,
  LikePosts,
  getLikedPin,
  getLikesPin,
  followersUsersPin,
  followedUsersPin,
  findUserByPinId,
  deleteImage,
};
