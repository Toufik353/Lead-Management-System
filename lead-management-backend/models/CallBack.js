const mongoose = require("mongoose");

const callbackSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  scheduledAt: { type: Date, },
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Callback", callbackSchema);
