// backend/models/InfluencerApplication.js
const mongoose = require("mongoose");

const InfluencerApplicationSchema = new mongoose.Schema({
  influencerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("InfluencerApplication", InfluencerApplicationSchema);
