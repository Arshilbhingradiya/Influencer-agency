const mongoose = require('mongoose');
const Campaign = require('./models/campaign');

async function createTestCampaign() {
  try {
    await mongoose.connect('mongodb://localhost:27017/influencer-agency');
    console.log('Connected to MongoDB');
    
    // Create a test campaign
    const testCampaign = new Campaign({
      title: "Test Social Media Campaign",
      description: "This is a test campaign for social media influencers. We're looking for creative content creators to promote our brand.",
      platforms: ["Instagram", "TikTok", "YouTube"],
      budget: 5000,
      targetAudience: "Young adults aged 18-35",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      status: "active",
      applications: []
    });
    
    const savedCampaign = await testCampaign.save();
    console.log('Test campaign created successfully:', savedCampaign);
    
    // Verify it's in the database
    const campaigns = await Campaign.find();
    console.log('Total campaigns in database:', campaigns.length);
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error creating test campaign:', error);
  }
}

createTestCampaign(); 