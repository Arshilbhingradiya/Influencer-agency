const mongoose = require('mongoose');
const Campaign = require('./models/campaign');

async function debugCampaigns() {
  try {
    await mongoose.connect('mongodb://localhost:27017/influencer-agency');
    console.log('Connected to MongoDB');
    
    // Get all campaigns
    const allCampaigns = await Campaign.find();
    console.log('=== ALL CAMPAIGNS ===');
    console.log(`Total campaigns: ${allCampaigns.length}`);
    
    allCampaigns.forEach((campaign, index) => {
      console.log(`\nCampaign ${index + 1}:`);
      console.log(`- ID: ${campaign._id}`);
      console.log(`- Title: ${campaign.title}`);
      console.log(`- Status: ${campaign.status}`);
      console.log(`- Created: ${campaign.createdAt}`);
      console.log(`- Has status field: ${campaign.hasOwnProperty('status')}`);
    });
    
    // Check campaigns with different status filters
    console.log('\n=== STATUS FILTERS ===');
    
    const activeCampaigns = await Campaign.find({ status: "active" });
    console.log(`Active campaigns: ${activeCampaigns.length}`);
    
    const noStatusCampaigns = await Campaign.find({ status: { $exists: false } });
    console.log(`Campaigns without status field: ${noStatusCampaigns.length}`);
    
    const nullStatusCampaigns = await Campaign.find({ status: null });
    console.log(`Campaigns with null status: ${nullStatusCampaigns.length}`);
    
    // Test the exact query used in getAvailableCampaigns
    console.log('\n=== AVAILABLE CAMPAIGNS QUERY ===');
    const availableCampaigns = await Campaign.find({
      $or: [
        { status: "active" },
        { status: { $exists: false } },
        { status: null }
      ]
    });
    console.log(`Available campaigns: ${availableCampaigns.length}`);
    
    if (availableCampaigns.length > 0) {
      availableCampaigns.forEach((campaign, index) => {
        console.log(`Available ${index + 1}: ${campaign.title} (Status: ${campaign.status})`);
      });
    }
    
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

debugCampaigns(); 