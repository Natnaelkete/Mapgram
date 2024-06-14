const router = require("express").Router();
// const Pin = require("../models/Pin");
const {
  createPin,
  upload,
  getPins,
  deletePin,
  updatePin,
  searchUsers,
  getPinsById,
  deleteImage,
  following,
  followersUsersPin,
  followedUsersPin,
  LikePosts,
  getLikedPin,
  getLikesPin,
  findUserByPinId,
} = require("../controllers/pinController");
const protect = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(protect, upload.array("images", 10), createPin)
  .patch(protect, updatePin)
  .delete(protect, deletePin);

router.get("/search", protect, searchUsers);
router.post("/image", protect, deleteImage);
router.get("/mine", protect, getPins);
router.post("/follow", protect, following);
router.get("/followers-pins", protect, followersUsersPin);
router.get("/followed-pins", protect, followedUsersPin);
router.post("/likes", protect, LikePosts);
router.get("/liked-pin", protect, getLikedPin);
router.get("/likes-pin", protect, getLikesPin);
router.get("/detail", protect, findUserByPinId);
router.get("/:pinId", protect, getPinsById);

module.exports = router;
