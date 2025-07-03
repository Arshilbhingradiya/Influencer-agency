const express = require("express");
const router = express.Router();
const multer = require("multer");
// const { getAvailableCampaigns } = require("../controllers/campaignController.js");
const path = require("path");
const {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  applyToCampaign,
  getAvailableCampaigns,
  getAppliedCampaigns,
  updateApplicationStatus
} = require("../controllers/campaignController");

// Setup Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.array("brandFiles", 5), createCampaign);
router.get("/", getCampaigns);
router.get("/available", (req, res, next) => {
  console.log("Available campaigns route matched");
  next();
}, getAvailableCampaigns);
router.get('/applied/:influencerId', getAppliedCampaigns);
router.get("/:id", (req, res, next) => {
  console.log("Campaign by ID route matched with ID:", req.params.id);
  next();
}, getCampaignById);
router.put("/:id", updateCampaign);
router.delete("/:id", deleteCampaign);
router.post("/:id/apply", applyToCampaign);
router.put("/:id/applications/:applicationId", updateApplicationStatus);

module.exports = router;
