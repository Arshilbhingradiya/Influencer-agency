import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/auth";

export default function AppliedCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const influencerId = user?._id || user?.id; // Use actual logged-in user's ID

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!influencerId) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/api/campaigns/applied/${influencerId}`);
        setCampaigns(res.data);
      } catch (err) {
        console.error("Error fetching applied campaigns", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [influencerId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return "✅";
      case "rejected":
        return "❌";
      case "pending":
      default:
        return "⏳";
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!influencerId) return <div className="text-center mt-10">Please log in to view your applications.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">My Applied Campaigns</h2>

      {campaigns.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No applications found.</p>
          <p className="text-gray-400 text-sm mt-2">Start applying to campaigns to see them here!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {campaigns.map((campaign) => {
            const application = campaign.applications?.find(app => app.influencerId === influencerId);
            return (
              <div key={campaign._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{campaign.title}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{campaign.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Budget:</span>
                        <p className="text-green-600 font-semibold">${campaign.budget}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Platforms:</span>
                        <p className="text-gray-600">{campaign.platforms?.join(", ") || "N/A"}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Deadline:</span>
                        <p className="text-gray-600">{new Date(campaign.deadline).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Applied:</span>
                        <p className="text-gray-600">{new Date(application?.createdAt || Date.now()).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application?.status || "pending")}`}>
                      <span className="mr-1">{getStatusIcon(application?.status || "pending")}</span>
                      {application?.status || "pending"}
                    </span>
                  </div>
                </div>
                
                {application?.note && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">📝 Your Application Note:</p>
                    <p className="text-gray-600 text-sm">{application.note}</p>
                  </div>
                )}
                
                {application?.status === "approved" && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-medium">🎉 Congratulations! Your application has been approved!</p>
                    <p className="text-green-600 text-sm mt-1">The company will contact you soon with further details.</p>
                  </div>
                )}
                
                {application?.status === "rejected" && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 font-medium">Application Status: Rejected</p>
                    <p className="text-red-600 text-sm mt-1">Don't worry, there are many other opportunities available!</p>
                  </div>
                )}
                
                {application?.status === "pending" && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-700 font-medium">⏳ Your application is under review</p>
                    <p className="text-yellow-600 text-sm mt-1">The company will review your application and get back to you soon.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
