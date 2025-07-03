// backend/controllers/influencerController.js
const InfluencerApplication = require("../models/InfluencerApplication.js");
const Campaign = require("../models/campaign.js");
const Influencer = require("../models/influencer.js");

const getInfluencerDashboard = async (req, res) => {
  const { influencerId } = req.params;

  try {
    const all = await InfluencerApplication.find({ influencerId });

    const stats = {
      totalApplied: all.length,
      totalApproved: all.filter(a => a.status === "approved").length,
      totalPending: all.filter(a => a.status === "pending").length,
    };

    const recent = await InfluencerApplication.find({ influencerId })
      .sort({ appliedAt: -1 })
      .limit(5)
      .populate("campaignId");

    const formattedRecent = recent.map((r) => ({
      _id: r._id,
      campaignTitle: r.campaignId.title,
      status: r.status,
      appliedAt: r.appliedAt,
    }));

    res.json({ stats, recent: formattedRecent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET profile
const getInfluencerProfile = async (req, res) => {
    try {
      const profile = await Influencer.findOne({ userId: req.params.id });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json(profile);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
  // Create profile
  const createInfluencerProfile = async (req, res) => {
    try {
      console.log("Creating profile with data:", req.body);
      
      const existing = await Influencer.findOne({ userId: req.body.userId });
      if (existing) {
        return res.status(400).json({ message: "Profile already exists" });
      }

      // Validate required fields
      if (!req.body.name || !req.body.name.trim()) {
        return res.status(400).json({ message: "Name is required" });
      }

      // Process platforms - handle both string and array inputs
      let platforms = [];
      if (req.body.platforms) {
        if (typeof req.body.platforms === 'string') {
          platforms = req.body.platforms.split(",").map(p => p.trim()).filter(p => p);
        } else if (Array.isArray(req.body.platforms)) {
          platforms = req.body.platforms.filter(p => p && p.trim());
        }
      }

      // Convert followers to number
      const followers = req.body.followers ? parseInt(req.body.followers) || 0 : 0;
  
      const newProfile = new Influencer({
        userId: req.body.userId,
        name: req.body.name.trim(),
        bio: req.body.bio ? req.body.bio.trim() : "",
        platforms: platforms,
        niche: req.body.niche ? req.body.niche.trim() : "",
        followers: followers,
        profilePicture: req.body.profilePicture ? req.body.profilePicture.trim() : "",
      });
  
      const savedProfile = await newProfile.save();
      console.log("Profile created successfully:", savedProfile);
      res.status(201).json(savedProfile);
    } catch (err) {
      console.error("Create profile error:", err);
      res.status(500).json({ error: "Failed to create profile", details: err.message });
    }
  };
  
  // Update profile
  const updateInfluencerProfile = async (req, res) => {
    try {
      // Validate required fields
      if (!req.body.name || !req.body.name.trim()) {
        return res.status(400).json({ message: "Name is required" });
      }

      // Process platforms - handle both string and array inputs
      let platforms = [];
      if (req.body.platforms) {
        if (typeof req.body.platforms === 'string') {
          platforms = req.body.platforms.split(",").map(p => p.trim()).filter(p => p);
        } else if (Array.isArray(req.body.platforms)) {
          platforms = req.body.platforms.filter(p => p && p.trim());
        }
      }

      // Convert followers to number
      const followers = req.body.followers ? parseInt(req.body.followers) || 0 : 0;

      const updated = await Influencer.findOneAndUpdate(
        { userId: req.params.id },
        {
          name: req.body.name.trim(),
          bio: req.body.bio ? req.body.bio.trim() : "",
          platforms: platforms,
          niche: req.body.niche ? req.body.niche.trim() : "",
          followers: followers,
          profilePicture: req.body.profilePicture ? req.body.profilePicture.trim() : "",
        },
        { new: true, runValidators: true }
      );
      if (!updated) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json(updated);
    } catch (err) {
      console.error("Update profile error:", err);
      res.status(500).json({ error: "Failed to update profile", details: err.message });
    }
  };
  

const getAppliedCampaigns = async (req, res) => {
  const { id } = req.params;

  try {
    const campaigns = await Campaign.find({ "applications.influencerId": id });

    const applied = campaigns.map(c => {
      const app = c.applications.find(a => a.influencerId.toString() === id);
      return {
        _id: c._id,
        title: c.title,
        budget: c.budget,
        status: app.status,
        appliedNote: app.note,
        deadline: c.deadline,
      };
    });

    res.json(applied);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applied campaigns" });
  }
};

// PUT /api/influencer/profile/:id
const updateProfile = async (req, res) => {
    try {
      const influencerId = req.params.id;
      const updateData = req.body;
  
      const updated = await Influencer.findByIdAndUpdate(influencerId, updateData, {
        new: true,
        runValidators: true,
      });
  
      if (!updated) return res.status(404).json({ error: 'Influencer not found' });
  
      res.json({ message: 'Profile updated successfully', influencer: updated });
    } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({ error: 'Server error while updating profile' });
    }
  };

module.exports = {
  getInfluencerDashboard,
  getInfluencerProfile,
  updateInfluencerProfile,
  createInfluencerProfile,
  getAppliedCampaigns,
  updateProfile
}; 