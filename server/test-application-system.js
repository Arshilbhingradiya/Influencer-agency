const mongoose = require('mongoose');
const Campaign = require('./models/campaign');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/influencer-agency', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function testApplicationSystem() {
  try {
    console.log('🧪 Testing Application System...\n');

    // 1. Check if there are campaigns
    const campaigns = await Campaign.find();
    console.log(`📊 Found ${campaigns.length} total campaigns`);

    if (campaigns.length === 0) {
      console.log('❌ No campaigns found. Please create some campaigns first.');
      return;
    }

    // 2. Check active campaigns
    const activeCampaigns = campaigns.filter(c => c.status === 'active');
    console.log(`✅ Found ${activeCampaigns.length} active campaigns`);

    // 3. Check applications across all campaigns
    let totalApplications = 0;
    let pendingApplications = 0;
    let approvedApplications = 0;
    let rejectedApplications = 0;

    campaigns.forEach(campaign => {
      if (campaign.applications) {
        totalApplications += campaign.applications.length;
        campaign.applications.forEach(app => {
          switch (app.status) {
            case 'pending':
              pendingApplications++;
              break;
            case 'approved':
              approvedApplications++;
              break;
            case 'rejected':
              rejectedApplications++;
              break;
            default:
              pendingApplications++; // Default to pending
              break;
          }
        });
      }
    });

    console.log('\n📈 Application Statistics:');
    console.log(`   Total Applications: ${totalApplications}`);
    console.log(`   Pending: ${pendingApplications}`);
    console.log(`   Approved: ${approvedApplications}`);
    console.log(`   Rejected: ${rejectedApplications}`);

    // 4. Show detailed campaign information
    console.log('\n🎯 Campaign Details:');
    campaigns.forEach((campaign, index) => {
      console.log(`\n   Campaign ${index + 1}: ${campaign.title}`);
      console.log(`   Status: ${campaign.status}`);
      console.log(`   Budget: $${campaign.budget}`);
      console.log(`   Applications: ${campaign.applications?.length || 0}`);
      
      if (campaign.applications && campaign.applications.length > 0) {
        console.log('   Application Details:');
        campaign.applications.forEach((app, appIndex) => {
          console.log(`     ${appIndex + 1}. Influencer: ${app.influencerId}`);
          console.log(`        Status: ${app.status || 'pending'}`);
          console.log(`        Note: ${app.note ? app.note.slice(0, 50) + '...' : 'No note'}`);
          console.log(`        Created: ${app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'No date'}`);
        });
      }
    });

    // 5. Test specific influencer applications
    if (totalApplications > 0) {
      const firstApplication = campaigns.find(c => c.applications?.length > 0)?.applications[0];
      if (firstApplication) {
        console.log(`\n🔍 Testing Influencer Applications for ID: ${firstApplication.influencerId}`);
        
        const influencerApplications = await Campaign.find({
          "applications.influencerId": firstApplication.influencerId
        });
        
        console.log(`   Found ${influencerApplications.length} campaigns with applications from this influencer`);
      }
    }

    // 6. Check for potential issues
    console.log('\n🔧 System Health Check:');
    
    // Check for campaigns without applications array
    const campaignsWithoutApplications = campaigns.filter(c => !c.applications);
    if (campaignsWithoutApplications.length > 0) {
      console.log(`   ⚠️  ${campaignsWithoutApplications.length} campaigns missing applications array`);
    } else {
      console.log('   ✅ All campaigns have applications array');
    }

    // Check for applications without status
    let applicationsWithoutStatus = 0;
    campaigns.forEach(campaign => {
      if (campaign.applications) {
        campaign.applications.forEach(app => {
          if (!app.status) applicationsWithoutStatus++;
        });
      }
    });
    
    if (applicationsWithoutStatus > 0) {
      console.log(`   ⚠️  ${applicationsWithoutStatus} applications missing status`);
    } else {
      console.log('   ✅ All applications have status');
    }

    // Check for applications without timestamps
    let applicationsWithoutTimestamp = 0;
    campaigns.forEach(campaign => {
      if (campaign.applications) {
        campaign.applications.forEach(app => {
          if (!app.createdAt) applicationsWithoutTimestamp++;
        });
      }
    });
    
    if (applicationsWithoutTimestamp > 0) {
      console.log(`   ⚠️  ${applicationsWithoutTimestamp} applications missing timestamps`);
    } else {
      console.log('   ✅ All applications have timestamps');
    }

    console.log('\n✅ Application system test completed!');
    console.log('\n📋 How to test the full flow:');
    console.log('1. Start the server: npm start');
    console.log('2. Start the client: npm run dev');
    console.log('3. Login as influencer and apply to campaigns');
    console.log('4. Login as company and review applications');
    console.log('5. Check dashboards for updated statistics');

  } catch (error) {
    console.error('❌ Error testing application system:', error);
  } finally {
    mongoose.connection.close();
  }
}

testApplicationSystem(); 