const router = require("express").Router();
const {
  authUser,
  registerUser,
  logoutUser,
  updateUser,
  upload,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

router.route("/register").post(upload.single("images"), registerUser);
router.post("/login", authUser);
router.post("/logout", protect, logoutUser);
router.put("/profile", protect, upload.single("images"), updateUser);

module.exports = router;
