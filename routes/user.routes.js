import express from "express";
import { body, validationResult } from "express-validator";
import connectToDb from "../config/db.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

// Validation and sanitization
const validateUser = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .trim()
    .escape(),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .trim()
    .escape(),
];

// Connect to MongoDB
connectToDb();

// User registration validation and processing
router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long")
      .trim()
      .escape(),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .trim()
      .escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      console.log("User registered:", newUser);
      return res.json({ message: "User registered" });
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.code === 11000) {
        // Handle duplicate email or username error
        return res
          .status(400)
          .json({ message: "Username or Email already exists" });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

const validateLoginUser = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .trim()
    .escape(),
  body("password")
    .isLength({ min: 6 })
    .escape()
    .withMessage("Password must be at least 6 characters long"),
];
router.post("/login", validateLoginUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(400)
      .json({ errors: [{ message: "Invalid credentials" }] });
  }

  // checking password

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ errors: [{ message: "Invalid credentials" }] });
  }

  const token = Jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2hr" }
  );
  res.cookie("token", token);
  res.send("logged in user");
});

export default router;
