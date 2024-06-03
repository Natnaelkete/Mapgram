const router = require("express").Router();
// const Pin = require("../models/Pin");
const {
  createPin,
  getPins,
  deletePin,
  updatePin,
} = require("../controllers/pinController");
const protect = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(protect, createPin)
  .get(getPins)
  .patch(protect, updatePin)
  .delete(protect, deletePin);

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
