const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyUser } = require("../middleware/verifyUser");

router.get("/", async function (req, res) {
  let users = await User.find();
  return res.status(200).json({ users });
});

router.post("/register", async function (req, res) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(403).json({ err: "Invalid credentials provided" });
    return;
  }

  let existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(403).json({ err: "User already exists" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = User.create({ firstName, lastName, email, password: hash });

  return res.status(201).json({ user });
});

router.post("/login", async function (req, res) {
  let token;
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user.firstName || !user.email === email) {
    return res.status(403).json({ err: "Invalid credentials" });
  }

  if (bcrypt.compareSync(password, user.password)) {
    token = jwt.sign({ id: user._id }, "My token secret");
    return res.status(201).json({ token });
  }
});

router.patch("/update", verifyUser, async function (req, res) {
  let user = await User.findByIdAndUpdate({ _id: req.user }, req.body);
  return res.status(201).json({ user });
});

// router.patch("update", verifyUser, function (req, res) {});

module.exports = router;
