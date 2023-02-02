const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = user.generateToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login an existing user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.verifyCredentials(email, password);
    const token = user.generateToken();
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
