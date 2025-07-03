const mongoose = require('mongoose');
const Campaign = require('./models/campaign');

async function createMoreCampaigns() {
  try {
    await mongoose.connect('mongodb://localhost:27017/influencer-agency');
    console.log('Connected to MongoDB');
    
    const campaigns = [
      {
        title: "Fashion Brand Collaboration",
        description: "Join our fashion brand campaign! We're looking for influencers to showcase our latest summer collection. Perfect for fashion and lifestyle content creators.",
        platforms: ["Instagram", "TikTok"],
        budget: 3000,
        targetAudience: "Fashion-conscious women aged 18-30",
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
        status: "active"
      },
      {
        title: "Tech Product Launch",
        description: "Exciting opportunity to promote our new tech gadget! We need tech influencers and reviewers to create engaging content about our innovative product.",
        platforms: ["YouTube", "Instagram", "TikTok"],
        budget: 8000,
        targetAudience: "Tech enthusiasts and early adopters",
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
        status: "active"
      },
      {
        title: "Fitness App Promotion",
        description: "Help us promote our fitness app! We're looking for fitness influencers to demonstrate workout routines and share their fitness journey.",
        platforms: ["Instagram", "YouTube"],
        budget: 4000,
        targetAudience: "Fitness enthusiasts and health-conscious individuals",
        deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
        status: "active"
      },
      {
        title: "Food Delivery Service",
        description: "Partner with us to promote our food delivery service! Perfect for food bloggers and lifestyle influencers who love sharing their dining experiences.",
        platforms: ["Instagram", "TikTok", "YouTube"],
        budget: 2500,
        targetAudience: "Food lovers and busy professionals",
        deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000), // 18 days from now
        status: "active"
      },
      {
        title: "Travel Destination Campaign",
        description: "Explore and promote amazing travel destinations! We're looking for travel influencers to create stunning content about our partner locations.",
        platforms: ["Instagram", "YouTube", "TikTok"],
        budget: 6000,
        targetAudience: "Travel enthusiasts and adventure seekers",
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), // 35 days from now
        status: "active"
      }
    ];
    
    for (const campaignData of campaigns) {
      const campaign = new Campaign({
        ...campaignData,
        applications: []
      });
      
      const savedCampaign = await campaign.save();
      console.log(`Created campaign: ${savedCampaign.title}`);
    }
    
    // Verify all campaigns are in the database
    const allCampaigns = await Campaign.find();
    console.log(`Total campaigns in database: ${allCampaigns.length}`);
    
    // Check available campaigns
    const availableCampaigns = await Campaign.find({
      $or: [
        { status: "active" },
        { status: { $exists: false } },
        { status: null }
      ]
    });
    console.log(`Available campaigns: ${availableCampaigns.length}`);
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error creating campaigns:', error);
  }
}

createMoreCampaigns(); 