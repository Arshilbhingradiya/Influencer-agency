// backend/routes/influencerRoutes.js
const express = require("express");
const { 
  getInfluencerDashboard, 
  getInfluencerProfile, 
  updateInfluencerProfile, 
  createInfluencerProfile,
  getAppliedCampaigns 
} = require("../controllers/influencerController.js");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Dashboard route
router.get("/dashboard/:influencerId", getInfluencerDashboard);

// Profile routes
router.get("/profile/:id", getInfluencerProfile);
router.post("/profile", createInfluencerProfile);
router.put("/profile/:id", updateInfluencerProfile);

// Campaign routes
router.get('/:id/applied-campaigns', getAppliedCampaigns);

module.exports = router;
