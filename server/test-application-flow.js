const mongoose = require('mongoose');
const Campaign = require('./models/campaign');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/influencer-agency', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function testApplicationFlow() {
  try {
    console.log('🔍 Testing Application Flow...\n');

    // 1. Check if there are any campaigns
    const campaigns = await Campaign.find({ status: 'active' });
    console.log(`📊 Found ${campaigns.length} active campaigns`);

    if (campaigns.length === 0) {
      console.log('❌ No active campaigns found. Please create some campaigns first.');
      return;
    }

    // 2. Show campaign details
    const testCampaign = campaigns[0];
    console.log(`\n🎯 Test Campaign: ${testCampaign.title}`);
    console.log(`   Budget: $${testCampaign.budget}`);
    console.log(`   Applications: ${testCampaign.applications?.length || 0}`);

    // 3. Show existing applications
    if (testCampaign.applications && testCampaign.applications.length > 0) {
      console.log('\n📝 Existing Applications:');
      testCampaign.applications.forEach((app, index) => {
        console.log(`   ${index + 1}. Influencer ID: ${app.influencerId}`);
        console.log(`      Status: ${app.status || 'pending'}`);
        console.log(`      Note: ${app.note || 'No note'}`);
        console.log(`      Applied: ${new Date(app.createdAt || Date.now()).toLocaleDateString()}`);
        console.log('');
      });
    } else {
      console.log('\n📝 No applications yet for this campaign');
    }

    // 4. Test application status distribution
    const statusCounts = {};
    campaigns.forEach(campaign => {
      if (campaign.applications) {
        campaign.applications.forEach(app => {
          const status = app.status || 'pending';
          statusCounts[status] = (statusCounts[status] || 0) + 1;
        });
      }
    });

    if (Object.keys(statusCounts).length > 0) {
      console.log('📈 Application Status Distribution:');
      Object.entries(statusCounts).forEach(([status, count]) => {
        console.log(`   ${status}: ${count} applications`);
      });
    }

    console.log('\n✅ Application flow test completed!');
    console.log('\n📋 How to test:');
    console.log('1. Go to Available Campaigns as an influencer');
    console.log('2. Click on a campaign to view details');
    console.log('3. Fill in the application note and submit');
    console.log('4. Check Applied Campaigns to see your application');
    console.log('5. As a company, go to Campaign Details to review applications');
    console.log('6. Approve or reject applications');

  } catch (error) {
    console.error('❌ Error testing application flow:', error);
  } finally {
    mongoose.connection.close();
  }
}

testApplicationFlow(); 