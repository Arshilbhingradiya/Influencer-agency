// client/src/pages/influencer/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/auth";

export default function InfluDashboard() {
  const [stats, setStats] = useState({
    totalApplied: 0,
    totalApproved: 0,
    totalPending: 0,
    totalRejected: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const influencerId = user?._id || user?.id;

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!influencerId) {
        setLoading(false);
        return;
      }

      try {
        setError(null);
        setLoading(true);
        
        // Fetch applied campaigns
        const res = await axios.get(`http://localhost:3000/api/campaigns/applied/${influencerId}`);
        const appliedCampaigns = res.data;
        
        // Calculate statistics
        let totalApplied = 0;
        let totalApproved = 0;
        let totalPending = 0;
        let totalRejected = 0;
        const allApplications = [];

        appliedCampaigns.forEach(campaign => {
          const userApplication = campaign.applications?.find(app => 
            app.influencerId === influencerId
          );
          
          if (userApplication) {
            totalApplied++;
            allApplications.push({
              _id: userApplication._id,
              campaignTitle: campaign.title,
              campaignBudget: campaign.budget,
              status: userApplication.status || 'pending',
              note: userApplication.note,
              appliedAt: userApplication.createdAt || campaign.createdAt,
              campaignId: campaign._id
            });

            switch (userApplication.status) {
              case 'approved':
                totalApproved++;
                break;
              case 'rejected':
                totalRejected++;
                break;
              case 'pending':
              default:
                totalPending++;
                break;
            }
          }
        });

        // Sort applications by date (most recent first)
        const sortedApplications = allApplications.sort((a, b) => 
          new Date(b.appliedAt) - new Date(a.appliedAt)
        );

        setStats({
          totalApplied,
          totalApproved,
          totalPending,
          totalRejected
        });
        
        setRecentApplications(sortedApplications.slice(0, 5)); // Show last 5 applications
        
      } catch (err) {
        console.error("Failed to load dashboard", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [influencerId]);

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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-lg">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!influencerId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <div className="max-w-5xl mx-auto p-6 flex flex-col gap-10">
        {/* Header */}
        <div className="flex items-center gap-6 mb-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-3xl text-white font-bold shadow-lg">
            <span>👤</span>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">Welcome, {user?.username || 'Influencer'}!</h1>
            <p className="text-lg text-gray-600">Track your campaign applications and performance</p>
          </div>
        </div>

        {/* Horizontal Stat Cards */}
        <div className="flex gap-6 overflow-x-auto pb-2">
          <div className="min-w-[220px] bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl mb-2">📋</div>
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.totalApplied}</div>
            <p className="text-gray-600 text-sm font-medium">Total Applied</p>
          </div>
          <div className="min-w-[220px] bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl mb-2">✅</div>
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.totalApproved}</div>
            <p className="text-gray-600 text-sm font-medium">Approved</p>
          </div>
          <div className="min-w-[220px] bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-2xl mb-2">⏳</div>
            <div className="text-3xl font-bold text-yellow-600 mb-1">{stats.totalPending}</div>
            <p className="text-gray-600 text-sm font-medium">Pending</p>
          </div>
          <div className="min-w-[220px] bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl mb-2">❌</div>
            <div className="text-3xl font-bold text-red-600 mb-1">{stats.totalRejected}</div>
            <p className="text-gray-600 text-sm font-medium">Rejected</p>
          </div>
        </div>

        {/* Horizontal Recent Applications */}
        <div className="flex gap-8 overflow-x-auto pb-2">
          <div className="min-w-[350px] bg-white rounded-2xl shadow-lg p-8 flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Recent Applications</h2>
            {recentApplications.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">📝</div>
                <p className="text-gray-500">No applications yet.</p>
                <p className="text-gray-400 text-sm mt-2">Start applying to campaigns to see them here!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application._id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{application.campaignTitle}</h3>
                        <p className="text-sm text-gray-600">Budget: ${application.campaignBudget?.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          application.status === "approved" ? "bg-green-100 text-green-800" :
                          application.status === "rejected" ? "bg-red-100 text-red-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {application.status}
                        </span>
                      </div>
                    </div>
                    {application.note && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Note:</span> {application.note.slice(0, 100)}
                        {application.note.length > 100 && "..."}
                      </p>
                    )}
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Applied: {new Date(application.appliedAt).toLocaleDateString()}</span>
                      <span>ID: {application._id?.slice(-8)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Analytics Bar Chart */}
          <div className="min-w-[350px] bg-white rounded-2xl shadow-lg p-8 flex-shrink-0 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Application Analytics</h2>
            <svg width="220" height="120" viewBox="0 0 220 120" className="mb-4">
              {/* Applied */}
              <rect x="10" y={100 - stats.totalApplied * 5} width="40" height={Math.max(stats.totalApplied * 5, 0)} fill="#60a5fa" rx="6" />
              <text x="30" y="115" textAnchor="middle" fontSize="14" fill="#2563eb">Total Applied</text>
              <text x="30" y={95 - stats.totalApplied * 5} textAnchor="middle" fontSize="14" fill="#2563eb">{stats.totalApplied}</text>
              {/* Approved */}
              <rect x="60" y={100 - stats.totalApproved * 5} width="40" height={Math.max(stats.totalApproved * 5, 0)} fill="#4ade80" rx="6" />
              <text x="80" y="115" textAnchor="middle" fontSize="14" fill="#166534">Total Approved</text>
              <text x="80" y={95 - stats.totalApproved * 5} textAnchor="middle" fontSize="14" fill="#166534">{stats.totalApproved}</text>
              {/* Pending */}
              <rect x="110" y={100 - stats.totalPending * 5} width="40" height={Math.max(stats.totalPending * 5, 0)} fill="#facc15" rx="6" />
              <text x="130" y="115" textAnchor="middle" fontSize="14" fill="#a16207">Total Pending</text>
              <text x="130" y={95 - stats.totalPending * 5} textAnchor="middle" fontSize="14" fill="#a16207">{stats.totalPending}</text>
              {/* Rejected */}
              <rect x="160" y={100 - stats.totalRejected * 5} width="40" height={Math.max(stats.totalRejected * 5, 0)} fill="#f87171" rx="6" />
              <text x="180" y="115" textAnchor="middle" fontSize="14" fill="#991b1b">Total Rejected</text>
              <text x="180" y={95 - stats.totalRejected * 5} textAnchor="middle" fontSize="14" fill="#991b1b">{stats.totalRejected}</text>
            </svg>
            <p className="text-gray-500 text-sm text-center">Visualize your application status at a glance</p>
          </div>

          {/* Quick Actions */}
          <div className="min-w-[350px] flex flex-col gap-8 flex-shrink-0">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 flex flex-col items-center shadow-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">🚀 Get Started</h3>
              <p className="text-blue-700 text-sm mb-4">Ready to find new opportunities?</p>
              <a 
                href="/availablecampaigns" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Available Campaigns
              </a>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 flex flex-col items-center shadow-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">📊 Track Progress</h3>
              <p className="text-green-700 text-sm mb-4">View all your applications and their status.</p>
              <a 
                href="/appliedcampaigns" 
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-green-700 transition-colors"
              >
                View All Applications
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
