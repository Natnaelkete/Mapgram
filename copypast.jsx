// Upload route for profile pictures
router.post(
  "/profile-pic",
  protect,
  upload.single("image"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }
    const imageUrl = req.file.path;

    try {
      // Assuming you have a User model where you store the profile picture URL
      const user = await User.findById(req.user._id);
      user.profilePic = imageUrl;
      await user.save();

      res.status(200).send({
        message: "Profile picture uploaded successfully",
        imageUrl,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
    }
  })
);

const deleteImage = asyncHandler(async (req, res) => {
  const { pinId, imageUrl, folder } = req.body;
  console.log(pinId, imageUrl, folder);
  try {
    const userPin = await UserPin.findOne({ user: req.user._id });

    if (!userPin) {
      res.status(404).json({ message: "User pin not found" });
      return;
    }

    const pin = userPin.pins.id(pinId);
    if (!pin) {
      res.status(404).json({ message: "Pin not found" });
      return;
    }

    // Extract imageId from imageUrl
    const imageId = `${folder}/${imageUrl.split("/").pop().split(".")[0]}`;
    console.log(imageId);

    // Remove image URL from pin
    pin.images = pin.images.filter((image) => !image.includes(imageId));

    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(imageId);
    if (result.result !== "ok") {
      throw new Error("Failed to delete image from Cloudinary");
    }

    await userPin.save();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { deleteImage };
