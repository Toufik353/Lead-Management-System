const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    company: String,
    status: {
        type: String,
        enum: ["New", "Contacted", "In Progress", "Closed"],
        default: "New",
    },
    leadSource:String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    disposition: { type: String, enum: ["Interested", "Not Interested", "Follow Up", "Wrong Number"], default: "Follow Up" },
    remarks: { type: String, default: "" }

},{ timestamps: true });

const Lead = mongoose.model("Lead", leadSchema);
module.exports = Lead;


