const router = require("express").Router();
const {
  authUser,
  registerUser,
  logoutUser,
} = require("../controllers/userController");
// const { protect } = require("../middlewares/authMiddleware");
// const User = require("../models/User");
// const bcrypt = require("bcrypt");

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);

module.exports = router;

// router.post("/register", async (req, res) => {
//   try {
//     //generate new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     //create a user
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     // save user and send res
//     const saveUser = await newUser.save();
//     res.status(200).json(saveUser);

//     // req.session.user = newUser;
//     // console.log(`New user created: ${user}`);
//     // res.redirect("/");
//   } catch (err) {
//     console.error(err);
//     if (err.code == 11000)
//       return res.status().json({ message: "Email already in use" });
//     else return res.status(500).json(err);
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     //find user
//     const user = await User.findOne({ username: req.body.username });
//     !user && res.status(401).json({ message: "wrong password or  email" });

//     //validate the password
//     const validPass = await bcrypt.compare(req.body.password, user.password);
//     !validPass && res.status(401).json("Invalid Password!");

//     //return json web token
//     // const token = signToken(user._id);
//     // res.cookie("token", token, { httpOnly: true }).sendStatus(200);
//     res.status(200).json({ _id: user._id, username: user.username });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/register", async (req, res) => {
//   try {
//     const user = await User.find();
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(user);
//   }
// });
// router.get("/login", async (req, res) => {
//   try {
//     const user = await User.find();
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(user);
//   }
// });

// module.exports = router;
