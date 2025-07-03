const mongoose = require('mongoose');
const Campaign = require('./models/campaign');

async function testCampaigns() {
  try {
    await mongoose.connect('mongodb://localhost:27017/influencer-agency');
    console.log('Connected to MongoDB');
    
    const campaigns = await Campaign.find();
    console.log('Total campaigns:', campaigns.length);
    
    if (campaigns.length > 0) {
      console.log('Sample campaign:', campaigns[0]);
    } else {
      console.log('No campaigns found in database');
    }
    
    // Check available campaigns specifically
    const availableCampaigns = await Campaign.find({
      $or: [
        { status: "active" },
        { status: { $exists: false } },
        { status: null }
      ]
    });
    
    console.log('Available campaigns:', availableCampaigns.length);
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

testCampaigns(); 