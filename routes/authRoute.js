const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  res.json({ message: "User registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.json({ error: "Wrong password" });

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({ message: "Login successful", token });
});

module.exports = router;