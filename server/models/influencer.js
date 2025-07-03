const mongoose = require("mongoose");

const InfluencerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  bio: String,
  platforms: [String],
  niche: String,
  followers: Number,
  profilePicture: String,
}, { timestamps: true });

module.exports = mongoose.model("Influencers", InfluencerSchema);
