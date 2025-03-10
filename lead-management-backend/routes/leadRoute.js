const express = require("express");
const Lead = require("../models/Lead");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ➤ Create a new Lead
router.post("/", protect, async (req, res) => {
    try {
        const { name, email, phone,status,disposition,remarks,leadSource } = req.body;
        const lead = await Lead.create({ name, email, phone,status,disposition,remarks,leadSource, createdBy: req.user.id });
        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ➤ Get all Leads for logged-in user
router.get("/", protect, async (req, res) => {
    try {
        const { search, status } = req.query;

        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } },
            ];
        }

        if (status) {
            query.status = status;
        }

        const leads = await Lead.find(query);
        res.json(leads);
    } catch (error) {
        console.error("Error fetching leads:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// ➤ Update a Lead
router.put("/:id", protect, async (req, res) => {
    try {
        const { name, email, phone, company, status, disposition, remarks ,leadSource} = req.body;
        let lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        // Update lead details
        lead.name = name || lead.name;
        lead.email = email || lead.email;
        lead.phone = phone || lead.phone;
        lead.company = company || lead.company;
        lead.status = status || lead.status;
        lead.disposition = disposition || lead.disposition;
        lead.remarks = remarks || lead.remarks;
        lead.leadSource = leadSource || lead.leadSource

        await lead.save();

        res.json({ message: "Lead updated successfully", lead });
    } catch (error) {
        console.error("Error updating lead:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// ➤ Delete a Lead
router.delete("/:id", protect, async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        res.json({ message: "Lead deleted successfully" });
    } catch (error) {
        console.error("Error in DELETE /api/leads/:id:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
