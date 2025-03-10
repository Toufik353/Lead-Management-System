// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const {protect} = require("../middleware/authMiddleware");
// const router = express.Router();

// // Get all users (Admin only)
// router.get("/", protect(["admin"]), async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });

// // Update user role (Admin only)
// router.put("/:id", protect(["admin"]), async (req, res) => {
//   const { role } = req.body;
//   await User.findByIdAndUpdate(req.params.id, { role });
//   res.json({ message: "User role updated" });
// });

// // Delete user (Admin only)
// router.delete("/:id", protect(["admin"]), async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "User deleted" });
// });

// module.exports = router;
