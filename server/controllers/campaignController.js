const Campaign = require("../models/campaign");
const path = require("path");
const mongoose = require("mongoose");

exports.createCampaign = async (req, res) => {
  try {
    const {
      title,
      description,
      platforms,
      budget,
      targetAudience,
      deadline,
      status
    } = req.body;

    const files = req.files || [];
    const filePaths = files.map(file => "/uploads/" + file.filename);

    const campaign = new Campaign({
      title,
      description,
      platforms: Array.isArray(platforms) ? platforms : [platforms],
      budget,
      targetAudience,
      deadline,
      brandFiles: filePaths,
      status: status || "active",
    });

    await campaign.save();
    console.log(`Campaign created: ${campaign.title} with status: ${campaign.status}`);
    res.status(201).json({ message: "Campaign created successfully", campaign });
  } catch (err) {
    console.error("Error creating campaign:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
};

exports.getCampaignById = async (req, res) => {
  try {
    console.log("getCampaignById called with ID:", req.params.id);
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      console.log("Campaign not found for ID:", req.params.id);
      return res.status(404).json({ error: "Not found" });
    }
    console.log("Campaign found:", campaign.title);
    res.json(campaign);
  } catch (err) {
    console.error("Error in getCampaignById:", err);
    res.status(500).json({ error: "Error retrieving campaign" });
  }
};
// Update a campaign
exports.updateCampaign = async (req, res) => {
    try {
      const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!campaign) return res.status(404).json({ error: "Campaign not found" });
      res.json(campaign);
    } catch (err) {
      res.status(500).json({ error: "Failed to update campaign" });
    }
  };
  
  // Delete a campaign
  exports.deleteCampaign = async (req, res) => {
    try {
      const campaign = await Campaign.findByIdAndDelete(req.params.id);
      if (!campaign) return res.status(404).json({ error: "Campaign not found" });
      res.json({ message: "Campaign deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete campaign" });
    }
  };
  exports.getAvailableCampaigns = async (req, res) => {
    try {
      console.log("Fetching available campaigns...");
      
      // Get campaigns that are active or don't have a status set
      const campaigns = await Campaign.find({
        $or: [
          { status: "active" }
        ]
      }).sort({ createdAt: -1 });

      console.log(`Found ${campaigns.length} available campaigns`);
      
      // Log each campaign for debugging
      campaigns.forEach((campaign, index) => {
        console.log(`Campaign ${index + 1}: ${campaign.title} (Status: ${campaign.status})`);
      });
      
      res.json(campaigns);
    } catch (err) {
      console.error("Error fetching available campaigns:", err);
      res.status(500).json({ 
        message: "Server error", 
        error: err.message 
      });
    }
  };
  exports.getAppliedCampaigns = async (req, res) => {
    const { influencerId } = req.params;
  
    try {
      const campaigns = await Campaign.find({
        "applications.influencerId": influencerId
      }).sort({ createdAt: -1 });
  
      res.json(campaigns);
    } catch (err) {
      console.error("Error fetching applied campaigns", err);
      res.status(500).json({ message: "Server error" });
    }
  };

exports.applyToCampaign = async (req, res) => {
  const { influencerId, note } = req.body;

  try {
    console.log("Applying to campaign:", req.params.id);
    console.log("Influencer ID:", influencerId);
    console.log("Note:", note);

    if (!influencerId) {
      return res.status(400).json({ message: "Influencer ID is required" });
    }

    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      console.log("Campaign not found:", req.params.id);
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Check if already applied
    const alreadyApplied = campaign.applications.some(app => 
      app.influencerId.toString() === influencerId
    );
    
    if (alreadyApplied) {
      console.log("Already applied by influencer:", influencerId);
      return res.status(400).json({ message: "Already applied to this campaign" });
    }

    // Add new application with timestamp and ensure it gets an ID
    const newApplication = {
      _id: new mongoose.Types.ObjectId(), // Explicitly set ID
      influencerId,
      note: note || "",
      status: "pending",
      createdAt: new Date()
    };

    campaign.applications.push(newApplication);
    
    await campaign.save();
    console.log("Application saved successfully for campaign:", campaign.title);
    console.log("Application ID:", newApplication._id);

    res.json({ 
      message: "Applied successfully",
      application: newApplication
    });
  } catch (err) {
    console.error("Apply error:", err);
    res.status(500).json({ 
      message: "Server error", 
      error: err.message 
    });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  const { id, applicationId } = req.params;
  const { status } = req.body;

  try {
    console.log("Updating application status:", { id, applicationId, status });

    if (!status || !['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Must be 'approved', 'rejected', or 'pending'" });
    }

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      console.log("Campaign not found:", id);
      return res.status(404).json({ message: "Campaign not found" });
    }

    const application = campaign.applications.id(applicationId);
    if (!application) {
      console.log("Application not found:", applicationId);
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await campaign.save();
    
    console.log("Application status updated successfully:", { applicationId, status });

    res.json({ 
      message: "Application status updated successfully", 
      application: application 
    });
  } catch (err) {
    console.error("Error updating application status:", err);
    res.status(500).json({ 
      message: "Server error", 
      error: err.message 
    });
  }
};