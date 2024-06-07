const router = require("express").Router();
// const Pin = require("../models/Pin");
const {
  createPin,
  upload,
  getPins,
  deletePin,
  updatePin,
  getUsersPin,
  getPinsById,
  deleteImage,
} = require("../controllers/pinController");
const protect = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(protect, getUsersPin)
  .post(protect, upload.array("images", 10), createPin)
  .patch(protect, updatePin)
  .delete(protect, deletePin);

router.post("/image", protect, deleteImage);
router.get("/:id", protect, getPinsById);
router.get("/mine", protect, getPins);

// router.post("/", async (req, res) => {
//   const newPin = new Pin(req.body);
//   try {
//     const savePin = await newPin.save();
//     res.status(200).json(savePin);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// router.get("/", async (req, res) => {
//   try {
//     const pin = await Pin.find();
//     res.status(200).json(pin);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
