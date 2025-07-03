const mongoose = require('mongoose');
const Campaign = require('./models/campaign');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/influencer-agency', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createTestApplication() {
  try {
    console.log('🧪 Creating test application...\n');

    // Find an existing campaign
    const campaign = await Campaign.findOne({ status: 'active' });
    
    if (!campaign) {
      console.log('❌ No active campaigns found. Please create a campaign first.');
      return;
    }

    console.log(`📢 Found campaign: ${campaign.title}`);
    console.log(`   Current applications: ${campaign.applications?.length || 0}`);

    // Create a test application
    const testApplication = {
      _id: new mongoose.Types.ObjectId(),
      influencerId: new mongoose.Types.ObjectId(), // Generate a random influencer ID
      note: "This is a test application from an influencer. I have 50K followers on Instagram and specialize in lifestyle content. I believe I would be perfect for this campaign because...",
      status: "pending",
      createdAt: new Date()
    };

    // Add the application to the campaign
    campaign.applications.push(testApplication);
    
    await campaign.save();
    
    console.log('✅ Test application created successfully!');
    console.log(`   Application ID: ${testApplication._id}`);
    console.log(`   Influencer ID: ${testApplication.influencerId}`);
    console.log(`   Status: ${testApplication.status}`);
    console.log(`   Total applications now: ${campaign.applications.length}`);

    console.log('\n🎯 How to test:');
    console.log('1. Start the server: npm start');
    console.log('2. Start the client: npm run dev');
    console.log('3. Login as company');
    console.log('4. Go to Campaign List');
    console.log('5. Click "View Details" on the campaign');
    console.log('6. Scroll down to Applications section');
    console.log('7. Try clicking Approve/Reject buttons');

  } catch (error) {
    console.error('❌ Error creating test application:', error);
  } finally {
    mongoose.connection.close();
  }
}

createTestApplication(); 