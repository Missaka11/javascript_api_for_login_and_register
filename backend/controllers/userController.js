const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

// @desc    Register new user
// @route   Post /users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user exists in the database by using schema
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hasedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hasedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      tocken: generateTocken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  // res.json({ message: "Register User" });
});

// @desc    Register new user
// @route   Post /users
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  // Compaire newly entered password with stored hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      tocken: generateTocken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  // res.json({ message: "Login User" });
});

// @desc    Get user data
// @route   Get /users
// @access  Public
const getUserData = asyncHandler(async (req, res) => {
  res.json({ message: "Register User" });
});

// @desc    Register new user
// @route   Post /users
// @access  Private
// For Get data using tocken
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });

  // res.json({ message: "User data display" });
});

// Generate a JWT
const generateTocken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getUserData, getMe };
