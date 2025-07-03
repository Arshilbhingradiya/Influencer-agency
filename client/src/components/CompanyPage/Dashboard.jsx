// 📁 src/pages/CompanyDashboard.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    totalBudget: 0,
    averageBudget: 0
  });
  const [recentCampaigns, setRecentCampaigns] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch all campaigns for this company
        const campaignsRes = await axios.get('http://localhost:3000/api/campaigns');
        const campaigns = campaignsRes.data;
        
        // Calculate statistics
        const totalCampaigns = campaigns.length;
        const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
        const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);
        const averageBudget = totalCampaigns > 0 ? Math.round(totalBudget / totalCampaigns) : 0;
        
        // Calculate application statistics
        let totalApplications = 0;
        let pendingApplications = 0;
        let approvedApplications = 0;
        
        campaigns.forEach(campaign => {
          if (campaign.applications) {
            totalApplications += campaign.applications.length;
            campaign.applications.forEach(app => {
              if (app.status === 'pending') pendingApplications++;
              if (app.status === 'approved') approvedApplications++;
            });
          }
        });
        
        // Get recent campaigns (last 5)
        const recentCampaigns = campaigns
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        
        // Get recent applications (last 10)
        const allApplications = [];
        campaigns.forEach(campaign => {
          if (campaign.applications) {
            campaign.applications.forEach(app => {
              allApplications.push({
                ...app,
                campaignTitle: campaign.title,
                campaignBudget: campaign.budget,
                campaignId: campaign._id
              });
            });
          }
        });
        
        const recentApplications = allApplications
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
        
        setStats({
          totalCampaigns,
          activeCampaigns,
          totalApplications,
          pendingApplications,
          approvedApplications,
          totalBudget,
          averageBudget
        });
        
        setRecentCampaigns(recentCampaigns);
        setRecentApplications(recentApplications);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleQuickAction = (action) => {
    switch (action) {
      case 'create-campaign':
        navigate('/create-campaign');
        break;
      case 'view-campaigns':
        navigate('/campaigns');
        break;
      case 'view-applications':
        navigate('/campaigns');
        break;
      case 'profile':
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600 font-medium">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6 flex flex-col gap-10">
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-3xl text-white font-bold shadow-lg">
            <span>🏢</span>
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-1">Welcome back, {user?.name || 'Company'}!</h1>
            <p className="text-lg text-gray-600">Manage your influencer campaigns with ease</p>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => handleQuickAction('create-campaign')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg flex items-center gap-2 transition-all duration-200"
            >
              <span className="text-2xl">➕</span>
              <span>Create Campaign</span>
            </button>
          </div>
        </div>

        {/* Horizontal Quick Actions */}
        <div className="flex gap-6 overflow-x-auto pb-2">
          <QuickActionCard
            title="Create Campaign"
            description="Launch a new influencer campaign"
            icon="🚀"
            color="blue"
            onClick={() => handleQuickAction('create-campaign')}
          />
          <QuickActionCard
            title="View Campaigns"
            description="Manage your existing campaigns"
            icon="📢"
            color="green"
            onClick={() => handleQuickAction('view-campaigns')}
          />
          <QuickActionCard
            title="Review Applications"
            description={`${stats.pendingApplications} pending reviews`}
            icon="👥"
            color="purple"
            onClick={() => handleQuickAction('view-applications')}
            badge={stats.pendingApplications}
          />
          <QuickActionCard
            title="Company Profile"
            description="Update your company information"
            icon="🏢"
            color="orange"
            onClick={() => handleQuickAction('profile')}
          />
        </div>

        {/* Horizontal Stats */}
        <div className="flex gap-6 overflow-x-auto pb-2">
          <StatCard 
            label="Total Campaigns" 
            value={stats.totalCampaigns} 
            icon="📢"
            color="blue"
            trend="+12%"
            trendUp={true}
          />
          <StatCard 
            label="Active Campaigns" 
            value={stats.activeCampaigns} 
            icon="✅"
            color="green"
            trend="+5%"
            trendUp={true}
          />
          <StatCard 
            label="Total Applications" 
            value={stats.totalApplications} 
            icon="👥"
            color="purple"
            trend="+23%"
            trendUp={true}
          />
          <StatCard 
            label="Pending Reviews" 
            value={stats.pendingApplications} 
            icon="⏳"
            color="yellow"
            trend={stats.pendingApplications > 0 ? `${stats.pendingApplications} new` : "All caught up"}
            trendUp={stats.pendingApplications > 0}
          />
        </div>

        {/* Horizontal Main Content Sections */}
        <div className="flex gap-8 overflow-x-auto pb-2">
          {/* Recent Campaigns */}
          <div className="min-w-[350px] bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex-shrink-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📢 Recent Campaigns</h2>
              <button
                onClick={() => handleQuickAction('view-campaigns')}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All →
              </button>
            </div>
            {recentCampaigns.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📢</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
                <p className="text-gray-600 mb-4">Create your first campaign to start working with influencers</p>
                <button
                  onClick={() => handleQuickAction('create-campaign')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Create Your First Campaign
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📢</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                        <p className="text-sm text-gray-600">
                          ${campaign.budget?.toLocaleString()} • {campaign.applications?.length || 0} applications
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {campaign.status}
                      </span>
                      <button
                        onClick={() => navigate(`/campaigns/${campaign._id}`)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Budget Overview */}
          <div className="min-w-[350px] bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">💰 Budget Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${stats.totalBudget.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Allocated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ${stats.averageBudget.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Average per Campaign</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stats.approvedApplications}
                </div>
                <div className="text-sm text-gray-600">Approved Collaborations</div>
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          <div className="min-w-[350px] bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex-shrink-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">👥 Recent Applications</h2>
              <button
                onClick={() => handleQuickAction('view-applications')}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All →
              </button>
            </div>
            {recentApplications.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">👥</div>
                <p className="text-gray-600 text-sm">No applications yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentApplications.slice(0, 5).map((application, index) => (
                  <div key={application._id || index} className="p-4 bg-gray-50 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm truncate">
                        {application.campaignTitle}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        application.status === 'approved' ? 'bg-green-100 text-green-800' :
                        application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status || 'pending'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      Influencer ID: {application.influencerId?.slice(-8)}...
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(application.createdAt || Date.now()).toLocaleDateString()}
                    </p>
                    {application.status === 'pending' && (
                      <button
                        onClick={() => navigate(`/campaigns/${application.campaignId}`)}
                        className="mt-2 text-blue-600 hover:text-blue-700 text-xs font-medium"
                      >
                        Review Now →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Application Status Chart */}
          <div className="min-w-[350px] bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex-shrink-0 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Application Analytics</h2>
            {/* Simple Bar Chart Visualization */}
            <svg width="220" height="120" viewBox="0 0 220 120" className="mb-4">
              {/* Pending */}
              <rect x="20" y={100 - stats.pendingApplications * 5} width="40" height={Math.max(stats.pendingApplications * 5, 0)} fill="#facc15" rx="6" />
              <text x="40" y="115" textAnchor="middle" fontSize="14" fill="#a16207">Pending</text>
              <text x="40" y={95 - stats.pendingApplications * 5} textAnchor="middle" fontSize="14" fill="#a16207">{stats.pendingApplications}</text>
              {/* Approved */}
              <rect x="90" y={100 - stats.approvedApplications * 5} width="40" height={Math.max(stats.approvedApplications * 5, 0)} fill="#4ade80" rx="6" />
              <text x="110" y="115" textAnchor="middle" fontSize="14" fill="#166534">Approved</text>
              <text x="110" y={95 - stats.approvedApplications * 5} textAnchor="middle" fontSize="14" fill="#166534">{stats.approvedApplications}</text>
              {/* Rejected */}
              <rect x="160" y={100 - (stats.totalApplications - stats.pendingApplications - stats.approvedApplications) * 5} width="40" height={Math.max((stats.totalApplications - stats.pendingApplications - stats.approvedApplications) * 5, 0)} fill="#f87171" rx="6" />
              <text x="180" y="115" textAnchor="middle" fontSize="14" fill="#991b1b">Rejected</text>
              <text x="180" y={95 - (stats.totalApplications - stats.pendingApplications - stats.approvedApplications) * 5} textAnchor="middle" fontSize="14" fill="#991b1b">{stats.totalApplications - stats.pendingApplications - stats.approvedApplications}</text>
            </svg>
            <p className="text-gray-500 text-sm text-center">Visualize your application status at a glance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick Action Card Component
const QuickActionCard = ({ title, description, icon, color, onClick, badge }) => {
  const colorClasses = {
    blue: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    green: 'bg-green-50 hover:bg-green-100 border-green-200',
    purple: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
    orange: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
  };

  return (
    <button
      onClick={onClick}
      className={`${colorClasses[color]} border-2 rounded-2xl p-6 text-left transition-all duration-200 hover:scale-105 hover:shadow-md`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        {badge && badge > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
};

// Stat Card Component
const StatCard = ({ label, value, icon, color, trend, trendUp }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
          trendUp ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {trend}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default CompanyDashboard;
