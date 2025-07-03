import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AvailableCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setError(null);
        console.log("Fetching available campaigns from:", "http://localhost:3000/api/campaigns/available");
        const res = await axios.get("http://localhost:3000/api/campaigns/available");
        console.log("Response received:", res.data);
        setCampaigns(res.data);
      } catch (err) {
        console.error("Failed to fetch campaigns", err);
        console.error("Error details:", err.response?.data);
        setError(`Failed to load campaigns: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-64">
      <div className="text-lg text-gray-600">Loading campaigns...</div>
    </div>
  );

  if (error) return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Available Campaigns</h1>
        <p className="text-gray-600">Discover and apply to campaigns that match your expertise</p>
      </div>
      
      {campaigns.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📢</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No campaigns available</h3>
          <p className="text-gray-500">Check back later for new opportunities!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{campaign.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3">{campaign.description}</p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm">
                  <span className="font-medium text-gray-700 mr-2">💰 Budget:</span>
                  <span className="text-green-600 font-semibold">${campaign.budget.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <span className="font-medium text-gray-700 mr-2">📅 Deadline:</span>
                  <span className="text-gray-600">{new Date(campaign.deadline).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <span className="font-medium text-gray-700 mr-2">🎯 Target:</span>
                  <span className="text-gray-600">{campaign.targetAudience}</span>
                </div>
                
                <div className="flex items-start text-sm">
                  <span className="font-medium text-gray-700 mr-2">📱 Platforms:</span>
                  <div className="flex flex-wrap gap-1">
                    {campaign.platforms.map((platform, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <Link
                to={`/campaign/${campaign._id}`}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-rgb(45 57 169) !important"
              >
                View Details & Apply
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
