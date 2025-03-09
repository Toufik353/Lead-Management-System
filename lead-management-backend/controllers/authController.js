// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// // User Registration
// router.post("/register", async (req, res) => {
//     const { name, email, password, role } = req.body;
//     try {
//         const userExists = await User.findOne({ email });
//         if (userExists) return res.status(400).json({ message: "User already exists" });

//         const user = await User.create({ name, email, password, role });
//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // User Login
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid credentials" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

//         res.json({ token, role: user.role });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Protected Route (Dashboard)
// router.get("/dashboard", protect, async (req, res) => {
//     res.json({ message: "Welcome to the Dashboard", user: req.user });
// });

// module.exports = router;
