const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"]
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address"
    ]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    trim: true,
    minlength: [8, "Password must be at least 8 characters long"],
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving user to database
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Verify user credentials when logging in
userSchema.statics.verifyCredentials = async function(email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("Incorrect email or password");

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error("Incorrect email or password");

  return user;
};

// Generate JWT token
userSchema.methods.generateToken = function() {
  return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: "1d" });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
