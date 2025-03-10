const express = require("express");
const router = express.Router();
const Callback = require("../models/CallBack");

// Create a new callback
router.post("/", async (req, res) => {
 try {

    const { name, email, phone, scheduledAt,notes } = req.body;

    if (!email || !scheduledAt) {
      return res.status(400).json({ message: "Missing required fields: email, leadId, scheduledAt" });
    }

    const newCallback = new Callback({ name, email, phone, scheduledAt,notes });
    await newCallback.save();
    res.status(201).json(newCallback);
  } catch (error) {
    console.error("Error creating callback:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get all scheduled callbacks
router.get("/", async (req, res) => {
  try {
    const callbacks = await Callback.find().sort({ scheduledAt: 1 });
    res.status(200).json(callbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update callback status
router.put("/:id", async (req, res) => {
  try {
    const updatedCallback = await Callback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCallback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a callback
router.delete("/:id", async (req, res) => {
  try {
    await Callback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Callback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
