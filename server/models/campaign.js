const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  platforms: [String],
  budget: {
    type: Number,
    required: true,
  },
  targetAudience: String,
  deadline: Date,
  brandFiles: [String], // Array of file paths for brand assets
  status: {
    type: String,
    enum: ["draft", "active", "completed"],
    default: "active",
  },
  applications: [
    {
      influencerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      note: String,
      status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
    }
  ]
  
}, { timestamps: true });

module.exports = mongoose.model("Campaign", campaignSchema);
